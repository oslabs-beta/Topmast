import { CHANGE_STATS } from "./actions";

import { initialState, saveState } from "./appContext";

// we will use this reducer to make changes to our global state

const reducer = (state, action) => {
  switch (action.type) {
    case action.type === CHANGE_STATS: {
      const newState = { ...state, stats: action.payload };
      saveState(newState);
      return newState;
    }
    case action.type === CHANGE_LOGS: {
      const newState = { ...state, logs: action.payload };
      saveState(newState);
      return newState;
    }
    case action.type === CHANGE_CONTAINERS: {
      const newState = { ...state, containers: action.payload };
      saveState(newState);
      return newState;
    }
  }
};

export default reducer;
