import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

import {
  Typography,
  Toolbar,
  Button,
  ButtonGroup,
  Box
} from '@mui/material';
import ContainerChart from '../components/ContainerChart';


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

      <h4>CPU% {stats[currentContainer]?.cpu} &nbsp; MEM %: {stats[currentContainer]?.memory}</h4>


    <ContainerChart />

    </>
  );
};

export default ContainerView;
