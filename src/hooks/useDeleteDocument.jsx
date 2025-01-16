import { useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { useIsMounted } from "./useIsMounted";

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  const isMounted = useIsMounted();

  const checkCancelledBeforeDispatch = (action) => {
    if (isMounted.current) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id) => {
    checkCancelledBeforeDispatch({
      type: "LOADING",
    });

    try {
      const deletedDocument = await deleteDoc(doc(db, docCollection, id));

      checkCancelledBeforeDispatch({
        type: "DELETED_DOC",
        payload: deletedDocument,
      });
    } catch (error) {
      checkCancelledBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  return { deleteDocument, response };
};
