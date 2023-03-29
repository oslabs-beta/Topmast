import { useContext, useReducer, createContext, useEffect } from "react";
import { CHANGE_STATS } from "./actions";

// This file creates our App Context Provider which allows for global
// state management in our app

// const [containers, setContainers] = React.useState<any[]>([]);
// const [logs, setLogs] = React.useState<any[]>([]);
// const [stats, setStats] = React.useState('');

// Create an initial state for the app

const savedState = localStorage.getItem("state");

const initialState = {
  containers: [],
  logs: [],
  stats: "",
};

const currentState = savedState ? JSON.parse(savedState) : initialState;

// define our appcontext for later export
const AppContext = createContext();

// create our app context provider. it will be invoked at the main.tsx level with the argument of
// children = App. this means that ALL components in the hierachy below and including App.tsx will
// have access to our global state and our reducer

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, currentState); // we in); // we intialize our state with the initial state

  // this is a sample function that a component can invoke to dispatch an action to
  // the reducer. this is basically the same flow as Redux
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

  const saveState = (state) => {
    localStorage.setItem("state", JSON.stringify(state));
  };

  // here we return our react component passing in the current state and all functions
  // that we want to make available
  return (
    <AppContext.Provider
      value={{ ...state, changeStats, changeLogs, changeContainers, saveState }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook to use app context. we write this here because otherwise we
// would have to write this useContext(AppContext) command in every single
// component that we want to access the state

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext, initialState };
