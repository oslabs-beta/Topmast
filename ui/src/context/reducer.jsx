import { initialState, saveState } from './AppContext'
import { CHANGE_LOGS, CHANGE_STATS, CHANGE_CONTAINERS } from './actions'

// we will use this reducer to make changes to our global state

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_STATS: {
      const newState = { ...state, stats: action.payload }
      saveState(newState)
      return newState
    }
    case CHANGE_LOGS: { 
      const newLogs = {...state.logs}
      newLogs[action.payload[0]] = [action.payload[1], action.payload[2]]
      const newState = { ...state, logs: newLogs}
      saveState(newState)
      return newState
    }
    case CHANGE_CONTAINERS: {
      const newState = { ...state, containers: action.payload }
      // console.log("payload" + JSON.stringify(action.payload));
      saveState(newState)
      return newState
    }
  }
}

export default reducer
