const initialState = [];

const candidateReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CANDIDATE": {
      return [...state, { ...action.payload }];
    }
    case "GET_CANDIDATES": {
      return [...action.payload];
    }
    case "UPDATE_CANDIDATE": {
      return state.map((ele) => {
        if (ele.id === action.payload.id) {
          return { ...action.payload };
        } else {
          return { ...ele };
        }
      });
    }
    case "STATUS": {
      return state.map((ele) => {
        if (ele.id == action.payload.id) {
          return {
            ...ele,
            status: action.payload.status,
            lastUpdated: action.payload.lastUpdated,
          };
        } else {
          return { ...ele };
        }
      });
    }
    case "DELETE_CANDIDATE": {
      return state.filter((ele) => {
        return ele.id !== action.payload;
      });
    }
    default: {
      return state;
    }
  }
};
export default candidateReducers;
