import { useAppContext } from '../context/AppContext';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle';
import { red, green } from '@mui/material/colors';
import { CardActionArea, Typography } from '@mui/material';

const DashboardView = () => {
  const {
    containers,
    logs,
    stats,
    getContainers,
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
      // getLogs();
      getStats();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* // DashboardView */}
      {containers.map((container) => {
        // console.log(container);
        if (container.Image !== 'moby-metrics/topmast:latest') {
          return (
            <Card>
              {/* CardActionArea will be our link to detail view, passing in the containerID as a prop */}
              <CardActionArea>
                <CardContent>
                  <Typography variant='h3'>{container.Names}</Typography>
                  <Typography>ID: {container.ID}</Typography>
                  <Typography>Image: {container.Image}</Typography>
                  {/* <Typography>Created: {container.Created}</Typography> */}
                  <Typography>State</Typography>
                  <Typography>Status: {container.Status}</Typography>
                  <Typography sx={{ color: () => red[300] }}>
                    CPU %: {stats[container.ID]['CPU %']}
                  </Typography>
                  <Typography>MEM %: {stats[container.ID]['MEM %']}</Typography>
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
                </CardContent>
              </CardActionArea>
            </Card>
          );
        }
      })}
    </div>
  );
};

export default DashboardView;
