const initialState = [];

const roundReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ROUND": {
      return [...action.payload];
    }
    default: {
      return state;
    }
  }
};
export default roundReducers;
