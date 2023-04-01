import React from "react";
import { useAppContext } from '../context/AppContext';
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
];

const rows = [
  { id: 1, firstName: "Jason", lastName: "Brown" },
  { id: 2, firstName: "Ryan", lastName: "Gause" },
];

const LogsDashboard = () => {
  // const { data } = useDemoData({
  //   dataSet: "Commodity",
  //   rowLength: 100,
  //   maxColumns: 6,
  // });

  const { logs } = useAppContext();


// logs:  time level msg,   requested per container
// mega-log is not useful!

  return (
    <Box style={{ height: 400, width: "100%" }}>
      <h1>topmast</h1>

      <div>LOGS!!
        { logs }
      </div>

      <DataGrid rows={rows} columns={columns} />

    </Box>
  );
};

export default LogsDashboard;
