import { useAppContext } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle';
import { red, green } from '@mui/material/colors';
import { CardActionArea, CardActions, Typography } from '@mui/material';

const DashboardView = () => {
  const {
    containers,
    logs,
    stats,
    getContainers,
    setCurrentContainer,
    getLogs,
    getStats,
    ddClient,
    startContainer,
    killContainer,
    superKillContainer,
  } = useAppContext();
  const [oneStats, setOneStats] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      getContainers();
      getLogs(containers);
      getStats(containers);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Link to='/'>Link to Root</Link> |&nbsp;
      <Link to='/container'>Link to generic container</Link> |&nbsp;
      <Link to='/containerlogs'>Link to Logs</Link>
      {containers.map((container) => {
        if (container.Image !== 'moby-metrics/topmast:latest') {
          return (
            <Card key={container.ID}>
              {/* CardActionArea will be our link to detail view, passing in the containerID as a prop */}
              <CardActionArea>
                <CardContent>
                  <Typography variant='h3'>{container.Names}</Typography>

                  {/* use arrow function to set id during map */}
                  <Link
                    to='/container'
                    onClick={() => setCurrentContainer(container.ID)}
                  >
                    Go to {container.ID}
                  </Link>

                  <Typography>ID: {container.ID}</Typography>
                  <Typography>Image: {container.Image}</Typography>
                  {/* <Typography>Created: {container.Created}</Typography> */}
                  <Typography>State</Typography>
                  <Typography>Status: {container.Status}</Typography>
                  <Typography sx={{ color: () => red[300] }}>
                    CPU %: {stats[container.ID]?.cpu}
                  </Typography>
                  <Typography>MEM %: {stats[container.ID]?.memory}</Typography>
                  {/* {Object.entries(stats[container.ID]).map((stat) => {
                      return (
                        <Typography>
                        {stat[0]} : {stat[1]}
                        </Typography>
                        );
                      })} */}
                  <CircleIcon
                    sx={{
                      color:
                        container.State === 'running' ? green[500] : red[500],
                    }}
                  />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant='outlined'
                  onClick={() => {
                    startContainer(container.ID);
                  }}
                >
                  START
                </Button>
                <Button
                  variant='outlined'
                  onClick={() => {
                    killContainer(container.ID);
                  }}
                >
                  KILL
                </Button>
                <Button
                  variant='contained'
                  onClick={() => {
                    superKillContainer(container.ID);
                  }}
                >
                  SUPERKILL
                </Button>
              </CardActions>
            </Card>
          );
        }
      })}
    </div>
  );
};

export default DashboardView;
