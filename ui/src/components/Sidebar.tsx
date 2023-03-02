import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from '@mui/icons-material';

type Props = {
  drawerWidth: any;
  isSidebarOpen: boolean;
  setIsSidebarOpen: any;
};

const Sidebar = (props: Props) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component='nav'>
      {props.isSidebarOpen && (
        <Drawer
          open={props.isSidebarOpen}
          onClose={() => props.setIsSidebarOpen(false)}
          variant='persistent'
          anchor='left'
          sx={{
            width: props.drawerWidth,
            '& .MuiDrawer-paper': {
              // color: theme.palette.secondary[200],
              // backgroundColor: theme.palette.background.alt,
              boxSizing: 'border-box',
              borderWidth: '2px',
              width: props.drawerWidth,
            },
          }}>
          hjkhaj
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
