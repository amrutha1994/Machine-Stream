import axios from "axios";

export const URL_ZEISS = "http://codingcase.zeiss.services"
export const URL_MACHINES = "/api/v1/machines"
export const GET_MACHINE_STATUS = "GET_MACHINE_STATUS"
export const GET_ALL_MACHINES = "GET_ALL_MACHINES"
export const GET_MACHINE_DETAIL = "GET_MACHINE_DETAIL"

export const axiosInstance = axios.create();

/**
 * Action to store the real time events from websocket feed
 * @param {*} payload 
 * 
 */
export const getRealTimeEvents = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: GET_MACHINE_STATUS,
      payload: payload,
    });
  };
}

/**
 * Action to get the list of all machine
 * 
 */
export const getAllMachines = () => {
  return async (dispatch) => {
    await axiosInstance.get(URL_ZEISS + URL_MACHINES).then(function (response) {
      dispatch({
        type: GET_ALL_MACHINES,
        payload: response,
      });

    }).catch(function (error) {
      dispatch({
        type: GET_ALL_MACHINES,
        payload: error,
      });
    });
  }
}

/**
 * Action to get details of a particular machine
 * @param {*} machineId 
 *
 */
export const getMachineDetails = (machineId) => {
  return async (dispatch) => {
    await axiosInstance.get(URL_ZEISS + URL_MACHINES + "/" + machineId)
      .then(function (response) {
        dispatch({
          type: GET_MACHINE_DETAIL,
          payload: response,
        });

      }).catch(function (error) {
        dispatch({
          type: GET_MACHINE_DETAIL,
          payload: error,
        });
      });
  }
}
