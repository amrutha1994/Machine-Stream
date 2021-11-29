import { GET_ALL_MACHINES, GET_MACHINE_DETAIL, GET_MACHINE_STATUS } from "./actions";

/**
 * Reducer function to store the real time activity of the machine 
 * @param {*} state 
 * @param {*} action 
 * 
 */
export function machineStatusReducer(state, action) {
  if (!state) state = {}
  const { type, payload } = action
  if (type == GET_MACHINE_STATUS) {
    return { machineStatus: payload }
  }
  else {
    return state
  }
}


/**
 * Reducer function to store the list of all machines
 * @param {*} state 
 * @param {*} action 
 */
export function machinesReducer(state, action) {
  if (!state) state = {}
  const { type, payload } = action
  if (type == GET_ALL_MACHINES) {
    return { machines: payload }
  }
  if (type == GET_MACHINE_DETAIL) {
    return { machineDetail: payload }
  }
  else {
    return state
  }
}
