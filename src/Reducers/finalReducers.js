const initialState = {};

const finalReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FINAL": {
      return { ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default finalReducers;
