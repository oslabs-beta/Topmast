import React from "react";
import Button from "@mui/material/Button";
import { Stack, TextField, Typography } from "@mui/material";
import { useAppContext } from "./context/AppContext";

import { Routes, Route, Link } from "react-router-dom"
import DashboardView from "./views/DashboardView"
import ContainerView from "./views/ContainerView"

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.

// all queries to the docker desktop client will be made in the App context
// and will user the reducer to change the global state

export function App() {


  return (
    <>

    <h2>TopMast Universal Branding Ahoy</h2>

      <Routes>
        <Route path="/" element={ <DashboardView/> } />
        <Route path="container" element={ <ContainerView/> } />
      </Routes>

    </>
  );
}
