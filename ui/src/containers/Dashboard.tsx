import React from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { createDockerDesktopClient } from '@docker/extension-api-client';
type Props = {};

const client = createDockerDesktopClient();
function useDockerDesktopClient() {
  return client;
}

const Dashboard = (props: Props) => {
  const [response, setResponse] = React.useState<string>();
  const [containers, setContainers] = React.useState<any[]>([]);
  const [logs, setLogs] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any[]>([]);
  const ddClient = useDockerDesktopClient();

  
  React.useEffect(() => {
    // List all containers
    ddClient.docker.cli.exec('ps', ['--all', '--format', '"{{json .}}"']).then((result) => {
      // result.parseJsonLines() parses the output of the command into an array of objects
      setContainers(result.parseJsonLines());
    }).then((result)=>{
      //this command will fetch the last 5 lines of each log from the list of containers. 
    containers.forEach((container) => {
      // console.log(container.ID);
      ddClient.docker.cli.exec(`container logs -n 5 ${container.ID}`, []).then((result) => {
        setLogs(logs.concat(result.stderr));
      });
    })})
    // this grabs a snapshot of the metrics of ALL containers
    ddClient.docker.cli.exec('stats', ['--no-stream', '-a']).then((result) => {
      // console.log(result);
      setStats(result.stdout)})
  }, []);
    
  return (
    <Box>
      {/* // <Typography variant='h3'>Docker extension demo</Typography>
      //{' '} */}
      <Typography
        variant='body1'
        color='text.secondary'
        sx={{ mt: 2 }}>
        This is a basic page rendered with MUI, using Docker's theme. Read the
        MUI documentation to learn more. Using MUI in a conventional way and
        avoiding custom styling will help make sure your extension continues to
        look great as Docker's theme evolves.
      </Typography>
      <Typography
        variant='body1'
        color='text.secondary'
        sx={{ mt: 2 }}>
        Pressing the below button will trigger a request to the backend. Its
        response will appear in the textarea.
      </Typography>
      <Stack
        direction='row'
        alignItems='start'
        spacing={2}
        sx={{ mt: 4 }}>
        <Button
          variant='contained'
          //this button used to fetch the data
          //it now has a placeholder in case we want it to do something.
          onClick={() => console.log('clicked')}>
          Call backend
        </Button>

        <TextField
          label='Backend response'
          sx={{ width: 480 }}
          disabled
          multiline
          variant='outlined'
          minRows={5}
          // we can assign this value to stats, logs, and container list
          value={stats ?? ''}/>
      </Stack>
    </Box>
  ); 
};

export default Dashboard;
  