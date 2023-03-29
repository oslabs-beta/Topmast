import { CHANGE_STATS } from "./actions";

import { initialState} from "./appContext";

const reducer = (state, action) => {
  if (action.type === CHANGE_STATS) {
    return {
      ...state,
      stats: action.payload
    }
  }
}

export default reducer;