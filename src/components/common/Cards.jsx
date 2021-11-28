import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import TimerIcon from '@mui/icons-material/Timer';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useHistory, withRouter } from 'react-router';
import { FINISHED, IDLE, MEASUREMENT, MICROSCOPE, REPAIRED, RUNNING } from "../Constants";
import RotateRightIcon from '@mui/icons-material/RotateRight';

const getStatusIcon = (status) => {
  switch (status) {
    case RUNNING: return <RotateRightIcon className="status-icon" sx={{ color: "#367DE1" }}/>
    case FINISHED: return <CheckCircleIcon className="status-icon" color="success" />
    case REPAIRED: return <ErrorIcon className="status-icon" sx={{ color: "red" }} />
    case IDLE: return <TimerIcon className="status-icon" sx={{ color: "yellow" }} />
  }
}

const getImage = (type) => {
  switch (type) {
    case MEASUREMENT: return "../../images/measurement.png"
    case MICROSCOPE: return "../../images/microscope.png"
  }
}
const Cards = (props) => {
  
  const history = useHistory();
  return (
    <Card className="card">
      <CardHeader
        title={props.item.machine_type}
        subheader={props.item.id}
      />

      <CardContent className="card-content">
        <Typography className="card-desc" variant="body2" color="text.secondary">
          <span className="status">{props.item.status}</span>
          {getStatusIcon(props.item.status)}
        </Typography>
        <CardMedia
          className="card-md"
          component="img"
          image={getImage(props.item.machine_type)}
          alt="Paella dish"
        />

      </CardContent>
      <CardActions disableSpacing className="card-footer">

        <Button
          size="small"
          onClick={() => {
            history.push('/machine/details', {
              item: props.item
            })
          }
          } >More Details</Button>
      </CardActions>

    </Card>
  );
}

export default withRouter(Cards);
