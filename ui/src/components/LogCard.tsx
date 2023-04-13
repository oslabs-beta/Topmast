import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

const LogCard = ({ containerId = '', output = [], errors = [] }) => {
  // console.log({ containerId, output, errors });
  return (
    <Card>
      <CardContent>
        <Typography>
          <strong>Container ID:</strong> {containerId}
        </Typography>
        <Typography>
          <strong>Output:</strong>
        </Typography>

        {output.map((line, index) => {
          return <Typography key={index}>{line}</Typography>;
        })}

        <Typography>
          <strong>Err:</strong>{' '}
        </Typography>
        {errors.map((line, index) => {
          return <Typography key={index}>{line}</Typography>;
        })}
      </CardContent>
    </Card>
  );
};

export default LogCard;
