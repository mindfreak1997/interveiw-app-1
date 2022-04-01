const initialState = false;

const adminReducers = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      return action.payload;
    }
    case "LOGOUT": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
export default adminReducers;
