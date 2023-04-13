import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Stack, TextField, Typography } from "@mui/material";
import { useAppContext } from "../context/AppContext";

export default function DashboardView() {
  const [response, setResponse] = React.useState<string>();
  const {
    containers,
    logs,
    stats,
    getContainers,
    getLogs,
    getStats,
    ddClient,
  } = useAppContext();

  const fetchAndDisplayResponse = async () => {
    const result = await ddClient.extension.vm?.service?.get("/hello");
    setResponse(JSON.stringify(result));
  };
  // this will run once and fetch logs and the container lists
  React.useEffect(() => {
    console.log({ containers }, { logs }, { stats });
    getContainers();
    getLogs(containers);
    getStats();
    console.log(stats);
  }, []);

  return (

    <div>
      <h2>Dashboard View</h2>

      <div>This is the content on the dash view component</div>

      <Link to="container">Generic Container Link</Link>

      <Typography variant="h3">Topmast: jb-router ooh yeah</Typography>

      <div>
        dumb nav for testing: &nbsp;
        <Link to="/">Dashboard (/)</Link> &nbsp;|&nbsp;
        <Link to="container">Generic Container</Link>
      </div>

      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        This is a basic page rendered with MUI, using Docker's theme. Read the
        MUI documentation to learn more. Using MUI in a conventional way and
        avoiding custom styling will help make sure your extension continues to
        look great as Docker's theme evolves.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Pressing the below button will trigger a request to the backend. Its
        response will appear in the textarea.
      </Typography>

      <Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" onClick={fetchAndDisplayResponse}>
          Call backend
        </Button>

        <TextField
          label="Backend response"
          sx={{ width: 480 }}
          disabled
          multiline
          variant="outlined"
          minRows={5}
          value={response ?? ""}
        />
      </Stack>

    </div>
  );
}
