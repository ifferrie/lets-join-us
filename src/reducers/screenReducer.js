import {
  REQUEST_DATA_SUCCESS,
  UPDATE_EVENT_INDEX
} from '../actions/screenAction'

export default (state = {
  events: [],
  eventIndex: 0
}, action) => {
 switch (action.type) {
  case REQUEST_DATA_SUCCESS:
   return {
    ...state,
    events: action.payload
   }
  case UPDATE_EVENT_INDEX:
   return {
    ...state,
    eventIndex: action.payload
   }
  default:
   return state
 }
}
