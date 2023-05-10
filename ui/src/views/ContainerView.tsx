import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

import { Typography } from '@mui/material';
import ContainerChart from '../components/ContainerChart';


const ContainerView = () => {

  const {
    currentContainer,
    containers,
    stats,
  } = useAppContext();


  return (
    <>
      <Link to='/'>Link to Root</Link> |&nbsp;
      <Link to='/container'>Link to generic container</Link> |&nbsp;
      <Link to='/containerlogs'>Link to Logs</Link>
      <h3>Content in the container view {currentContainer}</h3>

      <h3>cpu: {stats[currentContainer]?.cpu}</h3>
      <Typography>MEM %: {stats[currentContainer]?.memory}</Typography>


<hr />

    <h3>imported charts:</h3>
    <ContainerChart />



    </>
  );
};

export default ContainerView;
