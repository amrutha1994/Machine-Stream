import React, { useEffect, useState } from "react";
import Cards from "./common/Cards";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useDispatch, useSelector } from "react-redux";
import { getAllMachines, getRealTimeEvents } from "../redux/actions";


const response = { "data": [{ "status": "running", "machine_type": "measurement", "longitude": 48.09605679650394, "latitude": 11.523761466503995, "last_maintenance": "2017-04-01T17:00:00Z", "install_date": "2015-04-14", "id": "63f9d31e-18cf-4def-8887-164366d70c46", "floor": 4 }, { "status": "running", "machine_type": "measurement", "longitude": 48.0957067957825, "latitude": 11.523736091579735, "last_maintenance": "2017-04-01T18:00:00Z", "install_date": "2015-04-12", "id": "799819f8-6c19-47cc-9e3f-b9438b3bed4f", "floor": 4 }, { "status": "running", "machine_type": "microscope", "longitude": 48.09609724783261, "latitude": 11.52391849701985, "last_maintenance": "2017-04-01T11:00:00Z", "install_date": "2015-04-18", "id": "265a2ba3-4609-4974-ba07-e5eed81839ea", "floor": 5 }, { "status": "running", "machine_type": "microscope", "longitude": 48.09585756330223, "latitude": 11.523898463055515, "last_maintenance": "2017-04-01T11:00:00Z", "install_date": "2015-04-10", "id": "e447857c-3b4e-4d35-bf1d-77303eda7947", "floor": 5 }, { "status": "running", "machine_type": "microscope", "longitude": 48.09610228912977, "latitude": 11.52376716586951, "last_maintenance": "2017-04-01T17:00:00Z", "install_date": "2015-04-15", "id": "00eee2c7-ef69-4df9-94f9-c504ba2ce8a4", "floor": 5 }, { "status": "running", "machine_type": "microscope", "longitude": 48.09540056785246, "latitude": 11.523880271993598, "last_maintenance": "2017-04-01T15:00:00Z", "install_date": "2015-04-18", "id": "68015cc1-3119-42d2-9d4e-3e824723fe03", "floor": 5 }, { "status": "running", "machine_type": "measurement", "longitude": 48.09561704181971, "latitude": 11.524372591863866, "last_maintenance": "2017-04-01T15:00:00Z", "install_date": "2015-04-13", "id": "5b3ec85c-d2ff-404f-aa6b-0a5e82537caa", "floor": 5 }, { "status": "running", "machine_type": "measurement", "longitude": 48.0958563678207, "latitude": 11.523952859930345, "last_maintenance": "2017-04-01T10:00:00Z", "install_date": "2015-04-10", "id": "95d9b02f-3347-4c0c-a8a0-6e6e525121d5", "floor": 5 }, { "status": "running", "machine_type": "measurement", "longitude": 48.09595993829082, "latitude": 11.524347498644103, "last_maintenance": "2017-04-01T15:00:00Z", "install_date": "2015-04-12", "id": "555277c8-7b91-4275-9fb2-04735e8a88c6", "floor": 5 }, { "status": "running", "machine_type": "measurement", "longitude": 48.09610414000667, "latitude": 11.523848502761822, "last_maintenance": "2017-04-01T15:00:00Z", "install_date": "2015-04-18", "id": "e0776fcc-b8e7-4927-943b-10235df7678c", "floor": 4 }, { "status": "running", "machine_type": "microscope", "longitude": 48.09535029616455, "latitude": 11.523869432452495, "last_maintenance": "2017-04-01T14:00:00Z", "install_date": "2015-04-11", "id": "59d9f4b4-018f-43d8-92d0-c51de7d987e5", "floor": 4 }, { "status": "running", "machine_type": "measurement", "longitude": 48.09582682128459, "latitude": 11.523892768669045, "last_maintenance": "2017-04-01T12:00:00Z", "install_date": "2015-04-11", "id": "211bd1c5-9230-4ca3-8cc8-9c3226646b99", "floor": 4 }, { "status": "repaired", "machine_type": "measurement", "longitude": 48.095952816670994, "latitude": 11.524288505406927, "last_maintenance": "2017-04-01T16:00:00Z", "install_date": "2015-04-15", "id": "db9eb448-214b-481f-96fe-d1b883ec11a7", "floor": 5 }, { "status": "finished", "machine_type": "measurement", "longitude": 48.09600659378794, "latitude": 11.523755811180713, "last_maintenance": "2017-04-01T10:00:00Z", "install_date": "2015-04-14", "id": "653cab7e-03e7-47ce-b73f-4694e7093729", "floor": 5 }, { "status": "repaired", "machine_type": "measurement", "longitude": 48.095570309077104, "latitude": 11.524328414285511, "last_maintenance": "2017-04-01T11:00:00Z", "install_date": "2015-04-14", "id": "d29675bc-f3a4-424f-a9a1-68eb257bf30f", "floor": 5 }, { "status": "finished", "machine_type": "measurement", "longitude": 48.09541315955922, "latitude": 11.523818055989912, "last_maintenance": "2017-04-01T11:00:00Z", "install_date": "2015-04-10", "id": "840c6335-c0b9-49f8-9eba-e52ef9e23c43", "floor": 4 }, { "status": "running", "machine_type": "measurement", "longitude": 48.095640761511035, "latitude": 11.523804068586893, "last_maintenance": "2017-04-01T14:00:00Z", "install_date": "2015-04-15", "id": "cad031e6-e4ed-4d9a-b10d-ff9920d32b4e", "floor": 4 }, { "status": "running", "machine_type": "measurement", "longitude": 48.095966783945975, "latitude": 11.524419045043443, "last_maintenance": "2017-04-01T18:00:00Z", "install_date": "2015-04-10", "id": "15c14416-caa2-46da-a435-1c6a01e7e47f", "floor": 4 }, { "status": "finished", "machine_type": "microscope", "longitude": 48.09551415534282, "latitude": 11.52432985271383, "last_maintenance": "2017-04-01T14:00:00Z", "install_date": "2015-04-18", "id": "d00b151e-d488-4ffd-b1fc-a84587e9fb28", "floor": 4 }, { "status": "running", "machine_type": "measurement", "longitude": 48.096143207084715, "latitude": 11.523922346247339, "last_maintenance": "2017-04-01T10:00:00Z", "install_date": "2015-04-12", "id": "cf0959dd-39ba-4c56-90a4-582c2d7a9482", "floor": 4 }, { "status": "finished", "machine_type": "measurement", "longitude": 48.0956452197725, "latitude": 11.523728887406294, "last_maintenance": "2017-04-01T13:00:00Z", "install_date": "2015-04-16", "id": "3c9e61cd-616e-4765-823a-6af652720ef7", "floor": 4 }, { "status": "running", "machine_type": "measurement", "longitude": 48.095612723293506, "latitude": 11.524313736313678, "last_maintenance": "2017-04-01T13:00:00Z", "install_date": "2015-04-14", "id": "877a6017-9fcc-4338-b74c-681bf76a77f3", "floor": 5 }, { "status": "running", "machine_type": "measurement", "longitude": 48.095699442469936, "latitude": 11.523815319943127, "last_maintenance": "2017-04-01T16:00:00Z", "install_date": "2015-04-12", "id": "c72dfc43-9ab6-4a8a-b8ce-bb8f607794ec", "floor": 5 }, { "status": "running", "machine_type": "measurement", "longitude": 48.09614254162977, "latitude": 11.523855178716987, "last_maintenance": "2017-04-01T17:00:00Z", "install_date": "2015-04-13", "id": "ce0753da-1b8e-4ffc-b346-3158eec5b9d8", "floor": 5 }, { "status": "running", "machine_type": "measurement", "longitude": 48.095357097775626, "latitude": 11.523815310642274, "last_maintenance": "2017-04-01T10:00:00Z", "install_date": "2015-04-11", "id": "759c98a4-b66f-4799-b278-bab8aec881a0", "floor": 5 }, { "status": "running", "machine_type": "microscope", "longitude": 48.09582590168821, "latitude": 11.523934612394468, "last_maintenance": "2017-04-01T16:00:00Z", "install_date": "2015-04-17", "id": "45958000-f702-41be-93a8-9a7e3edd4121", "floor": 5 }] }
const Dashboard = () => {
    const dispatch = useDispatch()
    const machineStatusInStore = useSelector(state => state.machineStatusReducer.machineStatus)
    const allMachinesInStore = useSelector(state => state.machinesReducer.machines)
    const [machines, setMachines] = useState()

    useEffect(() => {
        dispatch(getAllMachines())
    }, [])

    useEffect(() => {
        console.log("allMachinesInStore-----", allMachinesInStore);

        if (allMachinesInStore && allMachinesInStore.data && Object.keys(allMachinesInStore.data).length > 0 &&
            allMachinesInStore.data.data && allMachinesInStore.data.data.length > 0
        ) {
            setMachines(allMachinesInStore.data.data)
        }
    }, [allMachinesInStore])

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
                console.log("newMachines-----", newMachines);
                setMachines(newMachines)
            }
        }
    }, [machineStatusInStore])

    //creating Web socket connection
    const client = new W3CWebSocket('ws://codingcase.zeiss.services/ws');
    client.onopen = () => {
        console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
        dispatch(getRealTimeEvents(JSON.parse(message.data)))
    };

    return (
        <div className="dashboard-container">{
            machines && machines.length > 0 &&
            machines.map(item => {
                return item && Object.keys(item).length > 0 &&
                    <Cards item={item} />
            })



        }</div>
    );
}

export default Dashboard;