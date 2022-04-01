const initialState = {};

const screeningReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SCREENING": {
      return { ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default screeningReducers;
