import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

import {
  Typography,
  Toolbar,
  Button,
  ButtonGroup,
  Box
} from '@mui/material';
import ContainerCharts from '../components/ContainerCharts';
import ContainerDemoCharts from '../components/ContainerDemoCharts';

const ContainerView = () => {

  const {
    currentContainer,
    containers,
    stats,
  } = useAppContext();


  return (
    <>
      <ButtonGroup sx={{mb:2}} size="small" variant="contained" aria-label="main navigation">
        <Button component={Link} to="/">Dashboard</Button>
        <Button component={Link} to="/containerlogs">Logs</Button>
      </ButtonGroup>

      <h2>Container Details: {currentContainer}</h2>

      <h4>stuff about the container</h4>


    <ContainerCharts />

    </>
  );
};

export default ContainerView;
