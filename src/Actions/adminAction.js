import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { asyncGetCandidates } from "./candidates";

export const adminLogin = (email, password, redirectHome) => {
  return async (dispatch) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      localStorage.setItem("status", true);
      dispatch(asyncGetCandidates());
      dispatch(loginAction(true));
      redirectHome();
    } catch (err) {
      alert(err.message);
    }
  };
};

const loginAction = (condition) => {
  return {
    type: "LOGIN",
    payload: condition,
  };
};

export const adminLogout = (redirectLogin) => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      localStorage.clear();
      dispatch(logoutAction(false));
      redirectLogin();
    } catch (err) {
      alert(err.message);
    }
  };
};
const logoutAction = (condition) => {
  return {
    type: "LOGOUT",
    payload: condition,
  };
};
