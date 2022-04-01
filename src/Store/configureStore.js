import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import adminReducers from "../Reducers/adminReducers";
import candidateReducers from "../Reducers/CandidateReducers";
import finalReducers from "../Reducers/finalReducers";
import roundReducers from "../Reducers/roundsReducers";
import screeningReducers from "../Reducers/screeningReducers";

const configureStore = () => {
  const store = createStore(
    combineReducers({
      login: adminReducers,
      candidates: candidateReducers,
      screening: screeningReducers,
      round: roundReducers,
      final: finalReducers,
    }),
    applyMiddleware(thunk)
  );
  return store;
};
export default configureStore;
