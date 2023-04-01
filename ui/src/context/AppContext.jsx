import { useContext, useReducer, createContext, useEffect } from "react";
import { CHANGE_STATS, CHANGE_LOGS, CHANGE_CONTAINERS } from "./actions";
import reducer from "./reducer";
import { createDockerDesktopClient } from "@docker/extension-api-client";

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
const savedState = localStorage.getItem("state");

const initialState = {
  containers: [],
  logs: [],
  stats: [],
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

  const changeContainers = (result) => {
    dispatch({
      type: CHANGE_CONTAINERS,
      payload: result,
    });
  };

  const getContainers = () => {
    console.log("i am getting containers");
    ddClient.docker.cli
      .exec("ps", ["--all", "--format", '"{{json .}}"'])
      .then((result) => {
        // result.parseJsonLines() parses the output of the command into an array of objects
        console.log(result);
        changeContainers(result.parseJsonLines());
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
          console.log("result!", result);
          changeLogs(result.stderr);
        });
    });
  };

  // this grabs a snapshot of the metrics of ALL containers
  // fetch stats on a timer of 5 seconds
  const getStats = () => {
    ddClient.docker.cli.exec("stats", ["--no-stream", "-a"]).then((result) => {
      // console.log(result);
      changeStats(result.stdout);
    });
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
        changeContainers,
        getContainers,
        getLogs,
        getStats,
        saveState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const saveState = (state) => {
  localStorage.setItem("state", JSON.stringify(state));
};

// custom hook to use app context. we write this here because otherwise we
// would have to write this useContext(AppContext) command in every single
// component that we want to access the state

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext, initialState, saveState };
