import { useContext, useReducer, createContext, useEffect } from 'react';
import { CHANGE_STATS, CHANGE_LOGS, CHANGE_CURRENT_CONTAINER } from './actions';
import reducer from './reducer';
import { createDockerDesktopClient } from '@docker/extension-api-client';

const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}
// This file creates our App Context Provider which allows for global
// state management in our app

// const [containers, setContainers] = React.useState<any[]>([]);
// const [logs, setLogs] = React.useState<any[]>([]);
// const [stats, setStats] = React.useState('');

// Create an initial state for the app

// this pulls the saved state from local storage. getItem returns
// a JSON
// localStorage.clear()
const savedState = localStorage.getItem('state');

const initialState = {
  containers: [],
  logs: {},
  stats: [],
  currentContainer: '',
};

// check to see if the saved state string has a value. if it does
// parse it into an object. if it does not, then we populate the
// current state with our initial state object
const currentState = savedState ? JSON.parse(savedState) : initialState;

// define our appcontext for later export
const AppContext = createContext(null);

// create our app context provider. it will be invoked at the main.tsx level with the argument of
// children = App. this means that ALL components in the hierachy below and including App.tsx will
// have access to our global state and our reducer

const AppContextProvider = ({ children }) => {
  // we intialize our state with the initial state
  const [state, dispatch] = useReducer(reducer, currentState);

  // this is a sample function that a component can invoke to dispatch an action to
  // the reducer. this is basically the same flow as Redux

  const ddClient = useDockerDesktopClient();

  const changeStats = (result) => {
    dispatch({
      type: CHANGE_STATS,
      payload: result,
    });
  };

  const changeLogs = (result) => {
    dispatch({
      type: CHANGE_LOGS,
      payload: result,
    });
  };

  const changeCurrentContainer = (result) => {
    dispatch({
      type: CHANGE_CURRENT_CONTAINER,
      payload: result,
    });
  };

  const getContainers = () => {
    console.log('i am getting containers');
    ddClient.docker.cli
      .exec('ps', ['--all', '--format', '"{{json .}}"'])
      .then((result) => {
        // result.parseJsonLines() parses the output of the command into an array of objects
        // removed changeContainers
        // changeContainers(result.parseJsonLines());
      });
  };

  // this grabs a snapshot of the logs of ALL containers
  // ... is this useful?
  const getLogs = (containers) => {
    containers.forEach((container) => {
      // console.log(container.ID);
      ddClient.docker.cli
        .exec(`container logs --details ${container.ID}`, [])
        .then((result) => {
          // console.log('result!', result)
          // console.log(result);
          changeLogs([container.ID, result.stdout, result.stderr]);
        });
    });
  };

  const setCurrentContainer = (id) => {
    changeCurrentContainer(id);
  };

  // this grabs a snapshot of the metrics of ALL containers
  // fetch stats on a timer of 5 seconds
  const getStats = (containers) => {
    const containerStats = {};
    containers.forEach((container) => {
      ddClient.docker.cli
        .exec('stats', ['--no-stream', container.ID])
        .then((result) => {
          const parsedStats = result.stdout.replace(/([ ]{2,})|(\n)/g, ',');
          const arr = parsedStats.split(',');

          // keeping this here for reference of what each array value means
          // containerStats[arr[8]] = {
          //   NAME: arr[9],
          //   cpu: arr[10],
          //   'MEM USAGE / LIMIT': arr[11],
          //   memory: arr[12],
          //   'NET I/O': arr[13],
          //   'BLOCK I/O': arr[14],
          //   PIDS: arr[15],
          // };
          changeStats([container.ID, arr[10], arr[12]]);
        });
    });
  };

  const startContainer = (containerID) => {
    ddClient.docker.cli.exec('container start', [containerID]);
    console.log('started container ' + containerID);
  };

  const killContainer = (containerID) => {
    ddClient.docker.cli.exec('container stop', [containerID]);
    console.log('killed container ' + containerID);
  };

  const superKillContainer = (containerID) => {
    ddClient.docker.cli.exec('container rm', ['-f', containerID]);
    console.log('superkilled container ' + containerID);
  };

  // here we return our react component passing in the current state and all functions
  // that we want to make available
  return (
    <AppContext.Provider
      value={{
        ...state,
        ddClient,
        changeStats,
        changeLogs,
        changeCurrentContainer,
        setCurrentContainer,
        getContainers,
        getLogs,
        getStats,
        saveState,
        startContainer,
        killContainer,
        superKillContainer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const saveState = (state) => {
  localStorage.setItem('state', JSON.stringify(state));
};

// custom hook to use app context. we write this here because otherwise we
// would have to write this useContext(AppContext) command in every single
// component that we want to access the state

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext, initialState, saveState };
