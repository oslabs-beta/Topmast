import { useAppContext } from "../context/AppContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CircleIcon from "@mui/icons-material/Circle";
import { Typography } from "@mui/material";

const DashboardView = () => {
  const { containers } = useAppContext();

  return (
    <div>
      {/* // DashboardView */}
      {containers.map((container) => {
        return (
          <Card>
            <CardContent>
              <Typography>{container.ID}</Typography>
              <Typography>{container.Image}</Typography>
              <Typography>{container.Created}</Typography>
              <Typography>{container.State}</Typography>

              <Typography>{container.Status}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardView;
