import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  queryEqual,
  refEqual,
  snapshotEqual,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { statusUpdate } from "./candidates";

const userCollectionRef = collection(db, "screening");

export const asyncScreening = (
  formData,
  updateData,
  notification,
  redirectHome
) => {
  return async (dispatch) => {
    try {
      const data = await addDoc(userCollectionRef, formData);
      dispatch(statusUpdate(updateData));
      redirectHome();
      notification();
    } catch (err) {
      alert(err.message);
    }
  };
};

export const getScreening = (id) => {
  return async (dispatch) => {
    try {
      const userQuery = query(userCollectionRef, where("cid", "==", id));
      const documentSnapshots = await getDocs(userQuery);
      const result = documentSnapshots.docs.map((ele) => ({
        ...ele.data(),
        id: ele.id,
      }));

      dispatch(screenAction(result[0]));
    } catch (err) {
      alert(err.message);
    }
  };
};

const screenAction = (data) => {
  return {
    type: "GET_SCREENING",
    payload: data,
  };
};
