import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { statusUpdate } from "./candidates";

const userCollectionRef = collection(db, "rounds");
export const asyncRounds = (
  formData,
  updateData,
  notification,
  redirectHome
) => {
  return async (dispatch) => {
    try {
      await addDoc(userCollectionRef, formData);
      dispatch(statusUpdate(updateData));
      notification();
      redirectHome();
    } catch (err) {
      alert(err.message);
    }
  };
};
export const getRounds = (id) => {
  return async (dispatch) => {
    try {
      const dataQuery = query(userCollectionRef, where("cid", "==", id));
      const data = await getDocs(dataQuery);
      const result = data.docs.map((ele) => {
        return { ...ele.data(), id: ele.id };
      });

      dispatch(roundAction(result));
    } catch (err) {
      alert(err.message);
    }
  };
};

const roundAction = (data) => {
  return {
    type: "GET_ROUND",
    payload: data,
  };
};
