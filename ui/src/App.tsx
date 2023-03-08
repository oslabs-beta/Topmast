import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material/';
import { createTheme } from '@mui/material/styles';
// import { themeSettings } from '/util/theme.js';
import { DockerMuiThemeProvider } from '@docker/docker-mui-theme';
import Dashboard from './containers/Dashboard';
import Layout from './containers/Layout';

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.

export function App() {
  // const mode = useSelector((state) => state.global.mode);
  // const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

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
