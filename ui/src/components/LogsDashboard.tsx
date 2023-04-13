import { useAppContext } from '../context/AppContext';
import { Box } from '@mui/material';
import LogCard from './LogCard';

const LogsDashboard = () => {
  const { logs } = useAppContext();

  return (
    <Box style={{ height: 400, width: '100%' }}>
      {Object.entries(logs).map(
        ([containerId, { output, errors }]: any[], index: number) => {
          return (
            <LogCard
              key={index}
              containerId={containerId}
              output={output}
              errors={errors}
            />
          );
        }
      )}
    </Box>
  );
};

export default LogsDashboard;
