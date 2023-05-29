import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  ButtonGroup,
  Toolbar,
  Paper,
  Menu,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowModel } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const LogsDashboard = () => {
  // Get logs and containers from AppContext
  const { logs, containers, getLogs } = useAppContext();
  // Initialize selectedContainers state as an empty set
  const [selectedContainers, setSelectedContainers] = useState<Set<string>>(
    () => {
      // Try to retrieve selectedContainers from localStorage
      const savedSelectedContainers =
        localStorage.getItem('selectedContainers');
      // If found, return a new set from the saved JSON array
      // If not found, return an empty set
      return savedSelectedContainers
        ? new Set(JSON.parse(savedSelectedContainers))
        : new Set();
    }
  );

  // Initialize the logsRows state
  const [logsRows, setLogsRows] = useState<GridRowModel[]>([]);
  const logsRef = useRef(logs);

  // Add state for the dropdown
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dropdownContent, setDropdownContent] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (containers && containers.length > 0) {
        // get logs for all containers
        getLogs(containers);
      }
    }, 1000); // fetch logs every 1 seconds

    return () => clearInterval(intervalId);
  }, [containers]);

  useEffect(() => {
    logsRef.current = logs;

    // Call the combinedRows function
    const newLogsRows = combinedRows(logsRef.current);
    // Update the logsRows state with the new rows
    setLogsRows(newLogsRows);
  }, [logs]); // Recalculate logsRows whenever logs change

  // Save selectedContainers to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'selectedContainers',
      JSON.stringify(Array.from(selectedContainers))
    );
  }, [selectedContainers]);

  // Define handleCheckboxChange function that updates the selectedContainers state
  const handleCheckboxChange = (containerId: string, checked: boolean) => {
    // Create a new set from selectedContainers
    const newSelectedContainers = new Set(selectedContainers);
    // If checked is true, add containerId to the new set
    // Else, delete containerId from the new set
    checked
      ? newSelectedContainers.add(containerId)
      : newSelectedContainers.delete(containerId);
    // Update selectedContainers state with the new set
    setSelectedContainers(newSelectedContainers);
  };

  // Define combinedRows function, which will create the logs to display in the DataGrid
  const combinedRows = (logs) => {
    // Use Object.entries() to transform logs object into an array of [containerId, logs] pairs
    // Filter this array to only include logs whose containerId is in selectedContainers,
    // or include all logs if selectedContainers is empty
    // Use flatMap() to create a new array of log rows, with each row including the containerId,
    // log type (Output/Error), and log content
    return Object.entries(logs)
      .filter(
        ([containerId]) =>
          selectedContainers.size === 0 || selectedContainers.has(containerId)
      )
      .flatMap(([containerId, { output, errors }]: any[]) => {
        // Check if output and errors are defined, if not, set them to empty arrays
        output = output || [];
        errors = errors || [];

        // For each container, create outputRows from output logs
        const outputRows = output
          .map(({ timestamp, content }, index) => {
            const date = new Date(timestamp);
            if (isNaN(date.getTime())) {
              console.warn(`Invalid timestamp: ${timestamp}`);
              return;
            }
            return {
              id: `${containerId}-o${index}`,
              containerId,
              type: 'Output',
              timestamp: date, // Keep as a Date
              content,
            };
          })
          .filter(Boolean); // filter out undefined rows

        // For each container, create errorRows from error logs
        const errorRows = errors
          .map(({ timestamp, content }, index) => {
            const date = new Date(timestamp);
            if (isNaN(date.getTime())) {
              console.warn(`Invalid timestamp: ${timestamp}`);
              return; // skip invalid timestamps
            }
            return {
              id: `${containerId}-e${index}`,
              containerId,
              type: 'Error',
              timestamp: date, // Keep as a Date
              content,
            };
          })
          .filter(Boolean); // filter out undefined rows

        // Combine outputRows and errorRows into a single array
        return [...outputRows, ...errorRows];
      });
  };

  const columns: GridColDef[] = [
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      width: 200,
      // Add a custom render function
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
      // Add a custom sort comparator
      sortComparator: (v1, v2, param1, param2) =>
        new Date(param1.value).getTime() - new Date(param2.value).getTime(),
    },
    { field: 'containerId', headerName: 'Container ID', width: 150 },
    { field: 'type', headerName: 'Type', width: 100 },
    {
      field: 'content',
      headerName: 'Content',
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <Typography>{params.value}</Typography>
          </div>
        );
      },
    },
  ];

  const clearLogs = () => {
    console.log('Clearing logs');
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>, param) => {
    setDropdownContent(param.row.content);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Render LogsDashboard component
  return (
    <div style={{ height: '100vh', width: '100%' }}>

      <ButtonGroup sx={{mb:2}} size="small" variant="contained" aria-label="main navigation">
        <Button component={Link} to="/">Dashboard</Button>
        <Button component={Link} to="/containerlogs">Logs</Button>
      </ButtonGroup>{' '}

      <Paper elevation={3} style={{ margin: '20px', padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Select Containers:
        </Typography>
        <Box display="flex" flexWrap="wrap">
          {containers.map((container: any) => (
            <FormControlLabel
              key={container.ID}
              control={
                <Checkbox
                  checked={selectedContainers.has(container.ID)}
                  onChange={(event) =>
                    handleCheckboxChange(container.ID, event.target.checked)
                  }
                />
              }
              label={container.Names}
            />
          ))}
        </Box>
      </Paper>

      <Toolbar>
        {/* <Button component={Link} to="/">
          Dashboard
        </Button>{' '} */}
        <Box sx={{ flexGrow: 1 }} /> {/* This pushes the button to the right */}
        <Button variant="contained" color="secondary" onClick={clearLogs}>
          Clear Logs
        </Button>
      </Toolbar>

      {/* Render the DataGrid with the combinedRows and columns */}
      <Box style={{ height: '90vh', width: '100%' }}>
        <DataGrid
          rows={logsRows}
          columns={columns}
          onRowClick={(param, event) => handleOpen(event, param)}
        />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: '80vh',
            width: 'auto',
            overflow: 'auto', // add scroll if the content exceeds the maxHeight
          },
        }}
      >
        <Typography style={{ padding: '10px' }}>{dropdownContent}</Typography>{' '}
        {/* padding for better aesthetics */}
      </Menu>
    </div>
  );
};

export default LogsDashboard;
