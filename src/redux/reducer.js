import { GET_ALL_MACHINES, GET_MACHINE_STATUS } from "./actions";



/**
 * Reducer function to set toggle state to 
 * get the 2 seconds interval
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

export function machinesReducer(state, action) {
  if (!state) state = {}
  const { type, payload } = action
  if (type == GET_ALL_MACHINES) {
    return { machines: payload }
  }
  else {
    return state
  }
}
