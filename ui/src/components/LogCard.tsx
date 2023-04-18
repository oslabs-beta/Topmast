import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const LogCard = ({ containerId = '', output = [], errors = [] }) => {
  // Combine output and error logs into a single array for DataGrid rows
  const combinedRows: GridRowsProp = [
    ...output.map((line, index) => {
      return { id: `o${index}`, containerId, type: 'Output', content: line };
    }),
    ...errors.map((line, index) => {
      return { id: `e${index}`, containerId, type: 'Error', content: line };
    }),
  ];

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

  return (
    <Card>
      <CardContent>
        // Display container ID
        <Typography>
          <strong>Container ID:</strong> {containerId}
        </Typography>
        // Render DataGrid with combinedRows and columns
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={combinedRows}
            columns={columns}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LogCard;
