import { useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import { useIsMounted } from "./useIsMounted";

const initialState = {
  loading: null,
  error: null,
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);

  const isMounted = useIsMounted();

  const checkCancelledBeforeDispatch = (action) => {
    if (isMounted.current) {
      dispatch(action);
    }
  };

  const updateDocument = async (uid, data) => {
    checkCancelledBeforeDispatch({
      type: "LOADING",
    });

    try {
      const docRef = await doc(db, docCollection, uid);

      const updatedDocument = await updateDoc(docRef, data);

      checkCancelledBeforeDispatch({
        type: "UPDATED_DOC",
        payload: updatedDocument,
      });
    } catch (error) {
      checkCancelledBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  return { updateDocument, response };
};
