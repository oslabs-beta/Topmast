// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import { Typography } from '@mui/material';
// import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

// const LogCard = ({ containerId = '', output = [], errors = [] }) => {
//   // console.log({ containerId, output, errors });
//   return (
//     <Card>
//       <CardContent>
//         <Typography>
//           <strong>Container ID:</strong> {containerId}
//         </Typography>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//         />
//         <Typography>
//           <strong>Output:</strong>
//         </Typography>

//         {output.map((line, index) => {
//           return <Typography key={index}>New Line:{line}</Typography>;
//         })}

//         <Typography>
//           <strong>Err:</strong>{' '}
//         </Typography>
//         {errors.map((line, index) => {
//           return <Typography key={index}>{line}</Typography>;
//         })}
//       </CardContent>
//     </Card>
//   );
// };

// export default LogCard;
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const LogCard = ({ containerId = '', output = [], errors = [] }) => {
  const combinedRows: GridRowsProp = [
    ...output.map((line, index) => {
      return { id: `o${index}`, containerId, type: 'Output', content: line };
    }),
    ...errors.map((line, index) => {
      return { id: `e${index}`, containerId, type: 'Error', content: line };
    }),
  ];

  const columns: GridColDef[] = [
    { field: 'containerId', headerName: 'Container ID', width: 150 },
    { field: 'type', headerName: 'Type', width: 100 },
    {
      field: 'content',
      headerName: 'Content',
      flex: 1,
      renderCell: (params) => {
        const lines = params.value.split('\n');
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
        <Typography>
          <strong>Container ID:</strong> {containerId}
        </Typography>
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
