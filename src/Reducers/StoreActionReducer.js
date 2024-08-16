// actions.js
import { addDoc, collection, getFirestore } from "firebase/firestore";

// Action Types
export const ADD_BOOKMARK = "ADD_BOOKMARK";
export const REMOVE_BOOKMARK = "REMOVE_BOOKMARK";

// Thunk Action Creator for adding/removing bookmarks
export const  StoreActionReducer = (payload) => {
  return async (dispatch, getState) => {
    const state = getState();
    const existingBookmark = state.bookmarks.find(
      (bkt) => bkt.title === payload.title
    );

    const db = getFirestore();
    const userCollection = collection(db, `Bookmarkdata`);

    if (existingBookmark) {
      const updatedBookmarks = state.bookmarks.filter(
        (bkt) => bkt.title !== payload.title
      );

      // Save updated bookmarks to Firebase
      await addDoc(userCollection, updatedBookmarks);

      // Dispatch action to remove the bookmark
      dispatch({
        type: REMOVE_BOOKMARK,
        payload: updatedBookmarks,
      });
    } else {
      const newBookmarks = [...state.bookmarks, payload];

      // Save new bookmarks to Firebase
      await addDoc(userCollection, payload);

      // Dispatch action to add the bookmark
      dispatch({
        type: ADD_BOOKMARK,
        payload: newBookmarks,
      });
    }
  };
};
