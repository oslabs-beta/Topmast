import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

type Props = {};

const Layout = (props: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <Box
      width='100%'
      height='100%'
      display='flex'>
      <Sidebar
        drawerWidth='200px'
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
