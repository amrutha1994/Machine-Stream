import EngineeringIcon from '@mui/icons-material/Engineering';
import EventIcon from '@mui/icons-material/Event';
import InsightsIcon from '@mui/icons-material/Insights';
import NumbersIcon from '@mui/icons-material/Numbers';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import StairsIcon from '@mui/icons-material/Stairs';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { getMachineDetails } from "../redux/actions";

/**
 * Method to show the details of a particular machine
 * @param {*} props 
 * @returns 
 */

const EquipmentDetails = (props) => {
    const dispatch = useDispatch()
    const machineDetailInStore = useSelector(state => state.machinesReducer.machineDetail)
    const machineStatusInStore = useSelector(state => state.machineStatusReducer.machineStatus)

    const [machineDetail, setMachineDetail] = useState()
    const [status, setStatus] = useState()
    const [events, setEvents] = useState()

    /**
     * Get meachine details on component load
     */
    useEffect(() => {
        if (props && props.location && props.location.state
            && props.location.state.item && Object.keys(props.location.state.item).length &&
            props.location.state.item.id
        ) {
            dispatch(getMachineDetails(props.location.state.item.id))
        }
    }, [])

    /**
     * Set machine details  based on machine details in the store
     */
    useEffect(() => {
        if (machineDetailInStore && machineDetailInStore.data &&
            Object.keys(machineDetailInStore.data).length > 0 &&
            machineDetailInStore.data.data && Object.keys(machineDetailInStore.data.data).length > 0
        ) {
            setMachineDetail(machineDetailInStore.data.data)
            if (machineDetailInStore.data.data.status) {
                setStatus(machineDetailInStore.data.data.status)
            }
            if (machineDetailInStore.data.data.events) {
                setEvents(machineDetailInStore.data.data.events)
            }
        }
    }, [machineDetailInStore])


    /**
     * Set status and event log based on real time data
     */
    useEffect(() => {
        if (machineStatusInStore && Object.keys(machineStatusInStore).length > 0
            && machineStatusInStore.payload && Object.keys(machineStatusInStore.payload).length > 0) {
            if (machineDetail && Object.keys(machineDetail).length > 0) {
                if (machineDetail.id == machineStatusInStore.payload.machine_id) {
                    setStatus(machineStatusInStore.payload.status)
                    setEvents(...events,
                        {
                            "status": machineStatusInStore.payload.status,
                            "timestamp": machineStatusInStore.payload.timestamp
                        })
                }
            }
        }
    }, [machineStatusInStore])


    return (
        machineDetail ?
            (
                <div className="details-container">
                    <List component="nav">
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <NumbersIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="ls-item" primary="Machine ID" secondary={machineDetail.id} />
                            <ListItemAvatar>
                                <Avatar>
                                    <InsightsIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Machine Type" className="capitalize" secondary={machineDetail.machine_type} />
                            <ListItemAvatar>
                                <Avatar>
                                    <EventIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Install date" secondary={formatDate(machineDetail.install_date)} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <RunningWithErrorsIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Status" className="capitalize" secondary={status} />
                            <ListItemAvatar>
                                <Avatar>
                                    <EngineeringIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Last maintenance" secondary={formatDate(machineDetail.last_maintenance)} />
                            <ListItemAvatar>
                                <Avatar>
                                    <StairsIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Floor" secondary={machineDetail.floor} />
                        </ListItem>
                    </List>
                    <div>
                        <h3 className="log-title">Event Log</h3>
                        <List component="nav" className="event-list">
                            {events && events.map(item => {
                                return <ListItem className={`event-item ${item.status}`}>
                                    <Typography className="capitalize">Status : {item.status}</Typography>
                                    <Typography className="capitalize">
                                        {formatDate(item.timestamp)}</Typography>
                                </ListItem>
                            })}


                        </List>
                    </div>


                </div>
            )
            :
            <div></div>
    );
}

/**
 * Method to format date
 * @param {*} dateString 
 * @returns 
 */
const formatDate = (dateString) => {
    const formattedDateTime =
        new Date(dateString).toLocaleTimeString(undefined) + ", " + new Date(dateString).toDateString()
    return formattedDateTime
}

export default (withRouter(EquipmentDetails))
