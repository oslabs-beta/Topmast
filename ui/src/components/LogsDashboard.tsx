import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const LogsDashboard = () => {
  // Get logs and containers from AppContext
  const { logs, containers } = useAppContext();
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

  // Define combinedRows, which will contain the logs to display in the DataGrid
  // - Use Object.entries() to transform logs object into an array of [containerId, logs] pairs
  // - Filter this array to only include logs whose containerId is in selectedContainers,
  //   or include all logs if selectedContainers is empty
  // - Use flatMap() to create a new array of log rows, with each row including the containerId,
  //   log type (Output/Error), and log content
  const combinedRows = Object.entries(logs)
    .filter(
      ([containerId]) =>
        selectedContainers.size === 0 || selectedContainers.has(containerId)
    )
    .flatMap(([containerId, { output, errors }]: any[]) => {
      // Check if output and errors are defined, if not, set them to empty arrays
      output = output || [];
      errors = errors || [];

      // For each container, create outputRows from output logs
      const outputRows = output.map((line, index) => {
        return {
          id: `${containerId}-o${index}`,
          containerId,
          type: 'Output',
          content: line,
        };
      });

      // For each container, create errorRows from error logs
      const errorRows = errors.map((line, index) => {
        return {
          id: `${containerId}-e${index}`,
          containerId,
          type: 'Error',
          content: line,
        };
      });

      // Combine outputRows and errorRows into a single array
      return [...outputRows, ...errorRows];
    });

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: 'containerId', headerName: 'Container ID', width: 150 },
    { field: 'type', headerName: 'Type', width: 100 },
    {
      field: 'content',
      headerName: 'Content',
      flex: 1,
      renderCell: (params) => {
        // Split log content into separate lines
        const lines = params.value.split('\n');
        // Render each line of log content as a Typography component
        return (
          <div>
            {lines.map((line, index) => (
              <Typography key={index}>{line}</Typography>
            ))}
          </div>
        );
      },
    },
  ];

  // Render LogsDashboard component
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Typography><Link to='/'>Dashboard</Link> |&nbsp;Container Logs</Typography>
      {/* Display a title for the container selection section */}
      <Typography variant='h6'>Select containers:</Typography>
      {/* Render container checkboxes */}
      <Box
        display='flex'
        flexWrap='wrap'>
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
            label={container.ID}
          />
        ))}
      </Box>
      {/* Render the DataGrid with the combinedRows and columns */}
      <Box style={{ height: '90vh', width: '100%' }}>
        <DataGrid
          rows={combinedRows}
          columns={columns}
        />
      </Box>
    </div>
  );
};

export default LogsDashboard;
