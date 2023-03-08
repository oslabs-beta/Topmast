import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import {
  SettingsOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  HomeOutlined,
  ReceiptLongOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from '@mui/icons-material';
import StorageIcon from '@mui/icons-material/Storage';
import pandaWhale from '../assets/pandaWhale.png';

const navItems = [
  { text: 'Dashboard', icon: <HomeOutlined /> },

  { text: 'Client Facing', icon: null },
  { text: 'Environments', icon: <StorageIcon /> },

  { text: 'Database Logs', icon: <ReceiptLongOutlined /> },
  { text: 'History', icon: <CalendarMonthOutlined /> },
  { text: 'Trends', icon: <TrendingUpOutlined /> },
  { text: 'Breakdown', icon: <PieChartOutlined /> },
  { text: 'Management', icon: null },
  { text: 'Admin', icon: <AdminPanelSettingsOutlined /> },
  { text: 'Settings', icon: <SettingsOutlined /> },
];

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
          <IconButton
            onClick={() => props.setIsSidebarOpen(!props.isSidebarOpen)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              // padding: theme.spacing(0, 1),
              // ...theme.mixins.toolbar,
            }}>
            <ChevronLeftOutlined />
          </IconButton>
          <Box width='100%'>
            <Box m='1.5rem 2rem 2rem 3rem'>
              <FlexBetween color={theme.palette.secondary.main}>
                <Box
                  display='flex'
                  alignItems='center'
                  gap='0.5rem'>
                  <Typography
                    fontSize='1rem'
                    fontWeight='bold'></Typography>
                  <Box
                    component='img'
                    alt='panda whale'
                    src={pandaWhale}
                    height='100%'
                    width='100%'
                    borderRadius='50%'
                    // sx={{ objectFix: 'cover' }}
                  />
                </Box>
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: '2.25rem 0 1rem 3rem' }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                return (
                  <ListItem
                    key={text}
                    disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary.dark
                            : 'transparent',
                        color:
                          active === lcText
                            ? theme.palette.info.dark
                            : theme.palette.text.secondary,
                      }}>
                      <ListItemIcon
                        sx={{
                          ml: '2rem',
                          color:
                            active === lcText
                              ? theme.palette.info.dark
                              : theme.palette.secondary.main,
                        }}>
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: 'auto' }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
