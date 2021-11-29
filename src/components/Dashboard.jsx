import React, { useEffect, useState } from "react";
import Cards from "./common/Cards";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useDispatch, useSelector } from "react-redux";
import { getAllMachines, getRealTimeEvents } from "../redux/actions";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { ERRORED, FINISHED, MEASUREMENT, MICROSCOPE, REPAIRED, RUNNING } from "./Constants";

/**
 * 
 * Functional component to show the dasboard
 */
const Dashboard = () => {
  const dispatch = useDispatch()
  const machineStatusInStore = useSelector(state => state.machineStatusReducer.machineStatus)
  const allMachinesInStore = useSelector(state => state.machinesReducer.machines)
  const [machines, setMachines] = useState()

  /**
   * Get all machines on component load
   */
  useEffect(() => {
    dispatch(getAllMachines())

    return () => {
      client.close()
  }
  }, [])

  /**
   * Set machines state array when there is any update in the store
   */
  useEffect(() => {
    if (allMachinesInStore && allMachinesInStore.data && Object.keys(allMachinesInStore.data).length > 0 &&
      allMachinesInStore.data.data && allMachinesInStore.data.data.length > 0
    ) {
      setMachines(allMachinesInStore.data.data)
    }
  }, [allMachinesInStore])

  /**
  * Set machines state array based on the real time data
  */
  useEffect(() => {
    if (machineStatusInStore && Object.keys(machineStatusInStore).length > 0
      && machineStatusInStore.payload && Object.keys(machineStatusInStore.payload).length > 0) {
      if (machines && Object.keys(machines).length > 0) {
        const newMachines = machines.map(machine => {
          if (machine.id == machineStatusInStore.payload.machine_id) {
            machine.status = machineStatusInStore.payload.status
          }
          return machine
        })
        setMachines(newMachines)
      }
    }
  }, [machineStatusInStore])

  // ************** creating Web socket connection ********************
  const client = new W3CWebSocket('ws://codingcase.zeiss.services/ws');
  client.onopen = () => {
      console.log('WebSocket Client Connected');
  };
  client.onmessage = (message) => {
      dispatch(getRealTimeEvents(JSON.parse(message.data)))
  };


  return (
    <>
      <div>
        <span className="title">Dashboard</span>
        <Card className="card-overview">
          {machines && Object.keys(machines).length > 0 &&
            <CardContent className="desc-card">
              <div>
                Total machines : {machines.length}
                <br />
                Microscopes: {machines.filter(machine => machine.machine_type == MICROSCOPE).length}
                <br />
                Measurement devices : {machines.filter(machine => machine.machine_type == MEASUREMENT).length}
              </div>
              <div>
                Running : {machines.filter(machine => machine.status == RUNNING).length}
                <br />
                Repaired/Errored : {machines.filter(machine => machine.status == REPAIRED ||
                  machine.status == ERRORED).length}
                <br />
                Finished : {machines.filter(machine => machine.status == FINISHED).length}
              </div>
            </CardContent>
          }
        </Card>
      </div>

      <span className="dashboard-desc"> Find the current health and activity of the installed machines at the moment</span>
      <div className="dashboard-container">
        {
          machines && machines.length > 0 &&
          machines.map(item => {
            return item && Object.keys(item).length > 0 &&
              <Cards item={item} />
          })



        }</div>
    </>
  );
}

export default Dashboard;