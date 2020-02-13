import { getEventSheet } from '../api/getSheetDataAPI'


const EVENTS_SHEET_ID = '1qC6SSrC1S9uZGVcfgLkMU81wasu-g6vxEAlw5jAGXes'
export const REQUEST_DATA = 'REQUEST_DATA'
export const REQUEST_DATA_LOADING = 'REQUEST_DATA_LOADING'
export const REQUEST_DATA_SUCCESS = 'REQUEST_DATA_SUCCESS'
export const REQUEST_DATA_FAILED = 'REQUEST_DATA_FAILED'
export const UPDATE_EVENT_INDEX = 'UPDATE_EVENT_INDEX'

export const requestDataAction = () => dispatch => {
  dispatch({ type: REQUEST_DATA })
  dispatch({ type: REQUEST_DATA_LOADING })
  getEventSheet(EVENTS_SHEET_ID).then((data) => {
    dispatch({
      type: REQUEST_DATA_SUCCESS,
      payload: data
    })
  }).catch((err) => dispatch({ type: REQUEST_DATA_FAILED }))
}

export const updateEventIndexAction = () => (dispatch, getState) => {
  const { eventIndex, events } = getState().screen
  const nextIndex = eventIndex + 1
  dispatch({
    type: UPDATE_EVENT_INDEX,
    payload:  nextIndex === events.length ? 0 : nextIndex
  })
}
