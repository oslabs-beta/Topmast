import React from 'react';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownCircleOutlined,
} from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from '../state';
import {
  AppBar,
  Icon,
  IconButton,
  InputBase,
  MenuItem,
  Toolbar,
  useTheme,
} from '@mui/material';

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = (props: Props) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        // boxShadow: 'none',
      }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton
            onClick={() => props.setIsSidebarOpen(!props.isSidebarOpen)}
            sx={{
              mr: 2,
              ...(props.isSidebarOpen === true && { display: 'none' }),
            }}>
            <MenuIcon />
          </IconButton>
          {/* Below code is for a search component */}
          {/* <FlexBetween
            // backgroundColor={theme.palette.background.alt}
            borderRadius='9px'
            gap='3rem'
            p='0.1rem 1.5rem'>
            <InputBase placeholder='Search...' />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween> */}
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap='1.5rem'>
          <IconButton
            onClick={() => {
              console.log('toggle dark/light mode'), dispatch(setMode());
            }}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>
          {/* Navbar settings icon */}
          {/* <IconButton>
            <SettingsOutlined sx={{ fontSize: '25px' }} />
          </IconButton> */}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
