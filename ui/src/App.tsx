// import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Stack, TextField, Typography } from "@mui/material";
import { useAppContext } from "./context/AppContext";
import DashboardView from "./views/DashboardView";

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.

// all queries to the docker desktop client will be made in the App context
// and will user the reducer to change the global state

export function App() {
  const [response, setResponse] = useState<string>();
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
  useEffect(() => {
    console.log({ containers }, { logs }, { stats });
    getContainers();
    getLogs(containers);
    getStats();
    console.log(stats);
  }, []);

  return (
    <>
      <Typography variant="h3">Docker extension demo</Typography>
      <DashboardView />
    </>
  );
}
