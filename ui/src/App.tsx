import React from "react";
import Button from "@mui/material/Button";
import { Stack, TextField, Typography } from "@mui/material";
import { useAppContext } from "./context/AppContext";

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.

// all queries to the docker desktop client will be made in the App context
// and will user the reducer to change the global state

export function App() {
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
    <>
      <Typography variant="h3">Topmast: jb-router</Typography>

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
    </>
  );
}
