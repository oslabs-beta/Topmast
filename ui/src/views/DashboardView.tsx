import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CircleIcon from "@mui/icons-material/Circle";
import { red, green } from "@mui/material/colors";
import { Typography } from "@mui/material";

const DashboardView = () => {
  const { containers, logs, stats, ddClient } = useAppContext();
  const [oneStats, setOneStats] = useState({});

  // useEffect(() => {
  //   for(const container of containers) {
  //     setOneStats({
  //   [container.ID]: await ddClient.docker.cli.exec("stats", ["--no-stream", container.ID])}
  //   )}},[]);

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
              <Typography>State</Typography>
              <CircleIcon
                sx={{
                  color: container.State === "running" ? green[500] : red[500],
                }}
              />
              <Typography>{container.Status}</Typography>
              <Typography>{oneStats[container.ID]}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardView;
