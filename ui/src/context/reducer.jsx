import { initialState, saveState } from './AppContext';
import {
  CHANGE_LOGS,
  CHANGE_STATS,
  CHANGE_CONTAINERS,
  CHANGE_CURRENT_CONTAINER,
} from './actions';

// we will use this reducer to make changes to our global state

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_STATS: {
      const newStats = { ...state.stats };
      const [containerId, cpu, memory] = action.payload;
      newStats[containerId] = {};
      newStats[containerId].cpu = cpu;
      newStats[containerId].memory = memory;
      const newState = { ...state, stats: newStats };
      saveState(newState);
      // console.log(action.payload);
      return newState;
    }
    case CHANGE_LOGS: {
      const newLogs = { ...state.logs };
      const [containerId, output, errors] = action.payload;
      newLogs[containerId] = {};
      newLogs[containerId].output =
        output.split('\n').map((line) => {
          const timestamp = line.slice(0, 30).trim();
          const content = line.slice(30).trim();
          const date = new Date(timestamp);
          const formattedTimestamp =
            `${date.getFullYear()}-` +
            `${String(date.getMonth() + 1).padStart(2, '0')}-` +
            `${String(date.getDate()).padStart(2, '0')} ` +
            `${String(date.getHours() % 12 || 12).padStart(2, '0')}:` +
            `${String(date.getMinutes()).padStart(2, '0')}:` +
            `${String(date.getSeconds()).padStart(2, '0')}` +
            `${date.getHours() < 12 ? ' AM' : ' PM'}`;
          return { timestamp: formattedTimestamp, content };
        }) || [];
      newLogs[containerId].errors =
        errors.split('\n').map((line) => {
          const timestamp = line.slice(0, 30).trim();
          const content = line.slice(30).trim();
          const date = new Date(timestamp);
          const formattedTimestamp =
            `${date.getFullYear()}-` +
            `${String(date.getMonth() + 1).padStart(2, '0')}-` +
            `${String(date.getDate()).padStart(2, '0')} ` +
            `${String(date.getHours() % 12 || 12).padStart(2, '0')}:` +
            `${String(date.getMinutes()).padStart(2, '0')}:` +
            `${String(date.getSeconds()).padStart(2, '0')}` +
            `${date.getHours() < 12 ? ' AM' : ' PM'}`;
          return { timestamp: formattedTimestamp, content };
        }) || [];
      const newState = { ...state, logs: newLogs };
      saveState(newState);
      return newState;
    }

    case CHANGE_CONTAINERS: {
      const newState = { ...state, containers: action.payload };
      // console.log("payload" + JSON.stringify(action.payload));
      saveState(newState);
      return newState;
    }
    case CHANGE_CURRENT_CONTAINER: {
      const newState = { ...state, currentContainer: action.payload };
      saveState(newState);
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default reducer;
