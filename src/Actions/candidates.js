import { db } from "../firebase-config";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  Firestore,
  query,
  limit,
  startAt,
  orderBy,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
const userCollectionRef = collection(db, "Candidates");
export const asyncGetCandidates = (page, rowsPerPage) => {
  return async (dispatch) => {
    try {
      const data = await getDocs(userCollectionRef);

      const result = data.docs.map((ele) => ({ ...ele.data(), id: ele.id }));

      dispatch(getCandidatesAction(result));
      /* const userCollectionRef = collection(db, "Candidates");
      const startPage = rowsPerPage - rowsPerPage * page + 1;
      console.log(startPage, page, rowsPerPage, "startPage");
      const userQuery = query(
        userCollectionRef,
        orderBy("name"),
        limit(rowsPerPage),
        startAt(startPage)
      );
      const documentSnapshots = await getDocs(userQuery);
      const result = documentSnapshots.docs.map((ele) => ({
        ...ele.data(),
        id: ele.id,
      }));
      console.log(result);
      dispatch(getCandidatesAction(result)); */
    } catch (err) {
      alert(err.message);
    }
  };
};

const getCandidatesAction = (data) => {
  return {
    type: "GET_CANDIDATES",
    payload: data,
  };
};

export const addCandidates = (formData, notification, resetForm) => {
  return async (dispatch) => {
    try {
      await addDoc(userCollectionRef, formData);
      dispatch(addCandidatesAction(formData));
      notification();
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };
};

const addCandidatesAction = (data) => {
  return {
    type: "ADD_CANDIDATE",
    payload: data,
  };
};
export const updateCandidates = (formData) => {
  return async (dispatch) => {
    try {
      const userDoc = doc(db, "Candidates", formData.id);
      await updateDoc(userDoc, formData);
      dispatch(updateAction(formData));
    } catch (err) {
      alert(err.message);
    }
  };
};

const updateAction = (data) => {
  return {
    type: "UPDATE_CANDIDATE",
    payload: data,
  };
};

export const statusUpdate = (updatedData) => {
  return async (dispatch) => {
    try {
      const userDoc = doc(db, "Candidates", updatedData.id);

      await updateDoc(userDoc, {
        status: updatedData.status,
        lastUpdated: updatedData.lastUpdated,
      });
      dispatch(statusAction(updatedData));
    } catch (err) {
      alert(err.message);
    }
  };
};
const statusAction = (data) => {
  return {
    type: "STATUS",
    payload: data,
  };
};

export const deleteCandidates = (id, notification) => {
  return async (dispatch) => {
    try {
      const userDoc = doc(db, "Candidates", id);
      await deleteDoc(userDoc);
      dispatch(deleteAction(id));
      notification();
    } catch (err) {
      alert(err.message);
    }
  };
};
const deleteAction = (id) => {
  return {
    type: "DELETE_CANDIDATE",
    payload: id,
  };
};
