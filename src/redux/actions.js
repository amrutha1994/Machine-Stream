import axios from "axios";

export const SCORE_CARD = "SCORE_CARD";
export const PENALTY = "PENALTY";
export const _URL_SKY = "http://85.214.74.245:9111/hblclock";
export const SEND_SCORE_BOARD = "SEND_SCORE_BOARD";
export const TOGGLE_STATE = "TOGGLE_STATE"
export const URL_ZEISS = "http://codingcase.zeiss.services"

export const GET_MACHINE_STATUS = "GET_MACHINE_STATUS"
export const GET_ALL_MACHINES = "GET_ALL_MACHINES"

export const axiosInstance = axios.create();

/**
 * Action to store the real time events from websocket feed
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
 * Action to send the score card to the backend
 * 
 */
export const getAllMachines = () => {
  return async (dispatch) => {
    await axiosInstance.get(URL_ZEISS+"/api/v1/machines").then(function (response) {
      console.log('Authenticated');
      dispatch({
        type: GET_ALL_MACHINES,
        payload: response,
      });

    }).catch(function (error) {
      console.log('Error on Authentication');
      dispatch({
        type: GET_ALL_MACHINES,
        payload: error,
      });
    });
  }
}

