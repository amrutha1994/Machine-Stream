import { Avatar, Divider, Grid, Item, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";
import { withRouter } from "react-router";
// import { withRouter } from 'react-router-dom';
import NumbersIcon from '@mui/icons-material/Numbers';
import WorkIcon from '@mui/icons-material/Work';
import InsightsIcon from '@mui/icons-material/Insights';
import EventIcon from '@mui/icons-material/Event';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import EngineeringIcon from '@mui/icons-material/Engineering';
import StairsIcon from '@mui/icons-material/Stairs';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useDispatch } from "react-redux";
import { getRealTimeEvents } from "../redux/actions";


const res = { "data": { "status": "repaired", "machine_type": "microscope", "longitude": 48.09609724783261, "latitude": 11.52391849701985, "last_maintenance": "2017-04-01T11:00:00Z", "install_date": "2015-04-18", "id": "265a2ba3-4609-4974-ba07-e5eed81839ea", "floor": 5, "events": [{ "timestamp": "2021-10-26T01:06:49Z", "status": "running" }, { "timestamp": "2021-09-25T13:35:25Z", "status": "repaired" }, { "timestamp": "2021-06-23T16:55:39Z", "status": "running" }, { "timestamp": "2021-06-12T21:19:15Z", "status": "running" }, { "timestamp": "2021-03-04T15:12:34Z", "status": "running" }, { "timestamp": "2021-01-22T04:39:02Z", "status": "running" }, { "timestamp": "2020-12-31T19:37:00Z", "status": "finished" }, { "timestamp": "2020-08-25T08:37:00Z", "status": "finished" }, { "timestamp": "2020-08-18T20:28:41Z", "status": "running" }, { "timestamp": "2020-07-07T09:50:22Z", "status": "finished" }, { "timestamp": "2020-05-29T00:16:15Z", "status": "running" }, { "timestamp": "2020-05-25T22:28:34Z", "status": "running" }, { "timestamp": "2020-05-03T10:11:58Z", "status": "finished" }, { "timestamp": "2020-04-27T12:11:52Z", "status": "running" }, { "timestamp": "2020-04-19T14:45:48Z", "status": "finished" }, { "timestamp": "2020-04-14T21:31:46Z", "status": "finished" }, { "timestamp": "2020-02-24T17:59:48Z", "status": "running" }, { "timestamp": "2020-01-29T16:19:41Z", "status": "finished" }, { "timestamp": "2019-12-07T09:12:54Z", "status": "running" }, { "timestamp": "2019-11-01T22:23:49Z", "status": "repaired" }, { "timestamp": "2019-10-03T06:07:16Z", "status": "running" }, { "timestamp": "2019-08-31T05:10:14Z", "status": "finished" }, { "timestamp": "2019-07-03T12:30:01Z", "status": "running" }, { "timestamp": "2019-06-26T03:53:45Z", "status": "running" }, { "timestamp": "2019-06-03T15:18:23Z", "status": "running" }, { "timestamp": "2019-04-27T22:49:04Z", "status": "running" }, { "timestamp": "2019-03-14T20:01:59Z", "status": "repaired" }, { "timestamp": "2018-11-21T17:59:53Z", "status": "running" }, { "timestamp": "2018-10-17T04:37:41Z", "status": "repaired" }, { "timestamp": "2018-10-02T07:34:07Z", "status": "running" }, { "timestamp": "2018-08-23T20:49:51Z", "status": "finished" }, { "timestamp": "2018-07-18T12:26:58Z", "status": "running" }, { "timestamp": "2018-07-15T11:12:58Z", "status": "finished" }, { "timestamp": "2018-06-06T10:36:52Z", "status": "finished" }, { "timestamp": "2018-05-07T14:13:54Z", "status": "finished" }, { "timestamp": "2018-04-18T13:24:29Z", "status": "running" }] } }

const formatDate = (dateString) => {
    const formattedDateTime =
        new Date(dateString).toLocaleTimeString(undefined) + ", " + new Date(dateString).toDateString()
    return formattedDateTime
}

const EquipmentDetails = (props) => {
    const dispatch = useDispatch()
    const client = new W3CWebSocket('ws://codingcase.zeiss.services/ws');
    client.onopen = () => {
        console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
        dispatch(getRealTimeEvents(message.data))
    };
    return (
        <div className="details-container">
            <List component="nav">
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <NumbersIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText className="ls-item" primary="Machine ID" secondary={res.data.id} />
                    <ListItemAvatar>
                        <Avatar>
                            <InsightsIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Machine Type" className="capitalize" secondary={res.data.machine_type} />
                    <ListItemAvatar>
                        <Avatar>
                            <EventIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Install date" secondary={formatDate(res.data.install_date)} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <RunningWithErrorsIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Status" className="capitalize" secondary={res.data.status} />
                    <ListItemAvatar>
                        <Avatar>
                            <EngineeringIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Last maintenance" secondary={formatDate(res.data.last_maintenance)} />
                    <ListItemAvatar>
                        <Avatar>
                            <StairsIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Floor" secondary={res.data.floor} />
                </ListItem>
            </List>
            <div>
                <h3 className="log-title">Event Log</h3>
                <List component="nav" className="event-list">
                    {res.data.events.map(item => {
                        return <ListItem className={`event-item ${item.status}`}>
                            <Typography className="capitalize">Status : {item.status}</Typography>
                            <Typography className="capitalize">
                                {formatDate(item.timestamp)}</Typography>
                        </ListItem>
                    })}


                </List>
            </div>


        </div>);
}

export default (withRouter(EquipmentDetails))
// export default EquipmentDetails
