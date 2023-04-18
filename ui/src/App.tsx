import React from 'react';
import Button from '@mui/material/Button';
import { Stack, TextField, Typography } from '@mui/material';
import { useAppContext } from './context/AppContext';

import { Routes, Route, Link } from 'react-router-dom';
import DashboardView from './views/DashboardView';
import ContainerView from './views/ContainerView';
import LogsDashboard from './components/LogsDashboard';

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.

// all queries to the docker desktop client will be made in the App context
// and will user the reducer to change the global state

export function App() {
  return (
    <>

    <h2>TopMast Universal Branding Ahoy</h2>

      <Routes>
        <Route
          path='/'
          element={<DashboardView />}
        />
        <Route
          path='container'
          element={<ContainerView />}
        />
        <Route
          path='containerlogs'
          element={<LogsDashboard />}
        />
      </Routes>
    </>
  );
}
// <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
//   Pressing the below button will trigger a request to the backend. Its
//   response will appear in the textarea.
// </Typography>
//
//
//
// <Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
//   <Button variant="contained" onClick={fetchAndDisplayResponse}>
//     Call backend
//   </Button>
//
//   <TextField
//     label="Backend response"
//     sx={{ width: 480 }}
//     disabled
//     multiline
//     variant="outlined"
//     minRows={5}
//     value={response ?? ""}
//   />
// </Stack>
