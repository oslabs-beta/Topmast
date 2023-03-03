import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material/';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './util/theme';
import { DockerMuiThemeProvider } from '@docker/docker-mui-theme';
import { createDockerDesktopClient } from '@docker/extension-api-client';
// import { Stack, TextField, Typography } from '@mui/material';
// import Button from '@mui/material/Button';
import Dashboard from './containers/Dashboard';
import Layout from './containers/Layout';

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  // response/setResponse not currently used here
  const [response, setResponse] = React.useState<string>();
  const ddClient = useDockerDesktopClient();

  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const fetchAndDisplayResponse = async () => {
    try {
      const result = await ddClient.extension.vm?.service?.get('/hello');
      setResponse(JSON.stringify(result));
    } catch (e: any) {
      setResponse(e.message);
    }
  };

  return (
    <>
      <BrowserRouter>
        <DockerMuiThemeProvider>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route
                path='/'
                element={
                  <Navigate
                    to='/dashboard'
                    replace
                  />
                }
              />
              <Route
                path='/dashboard'
                element={<Dashboard />}
              />
            </Route>
          </Routes>
        </DockerMuiThemeProvider>
      </BrowserRouter>
    </>
  );
}

// <Typography variant='h3'>Docker extension demo</Typography>
// <Typography
//   variant='body1'
//   color='text.secondary'
//   sx={{ mt: 2 }}>
//   This is a basic page rendered with MUI, using Docker's theme. Read the
//   MUI documentation to learn more. Using MUI in a conventional way and
//   avoiding custom styling will help make sure your extension continues to
//   look great as Docker's theme evolves.
// </Typography>
// <Typography
//   variant='body1'
//   color='text.secondary'
//   sx={{ mt: 2 }}>
//   Pressing the below button will trigger a request to the backend. Its
//   response will appear in the textarea.
// </Typography>
// <Stack
//   direction='row'
//   alignItems='start'
//   spacing={2}
//   sx={{ mt: 4 }}>
//   <Button
//     variant='contained'
//     onClick={fetchAndDisplayResponse}>
//     Call backend
//   </Button>

//   <TextField
//     label='Backend response'
//     sx={{ width: 480 }}
//     disabled
//     multiline
//     variant='outlined'
//     minRows={5}
//     value={response ?? ''}
//   />
// </Stack>
