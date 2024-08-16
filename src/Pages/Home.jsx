import { useEffect } from "react";
import Hero from "../component/Hero";
import Side_navbar from "../component/Side_navabar";
import Header from "../component/Header";
import Section_1 from "../component/Section_1";
import { useDispatch, useSelector } from "react-redux";
import Section_2 from "../component/Section_2";
import Section_3 from "../component/Section_3";
import Section_4 from "../component/Section_4";
import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../Config";
import { onAuthStateChanged } from "firebase/auth";

function Home() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(state);
  // useEffect(() => {
  //   async function Api() {
  //     //   const url =
  //     //     "https://book-information-library.p.rapidapi.com/api/books/getall-books";
  //     //   const options = {
  //     //     method: "GET",
  //     //     headers: {
  //     //       "x-rapidapi-key":
  //     //         "f15b3a4cbamshaa52643b36734bfp12135bjsnd320635af0b5",
  //     //       "x-rapidapi-host": "book-information-library.p.rapidapi.com",
  //     //     },
  //     //   };

  //     //   try {
  //     //     const response = await fetch(url, options);
  //     //     const result = await response.json();
  //     //     console.log(result);
  //     //   } catch (error) {
  //     //     console.error(error);
  //     //   }
  //     //   const url =
  //     //     "https://book-information-library.p.rapidapi.com/api/books/book-recommendations?genre=Fantasy";
  //     //   const options = {
  //     //     method: "GET",
  //     //     headers: {
  //     //       "x-rapidapi-key":
  //     //         "f15b3a4cbamshaa52643b36734bfp12135bjsnd320635af0b5",
  //     //       "x-rapidapi-host": "book-information-library.p.rapidapi.com",
  //     //     },
  //     //   };

  //     //   try {
  //     //     const response = await fetch(url, options);
  //     //     const result = await response.text();
  //     //     console.log(result);
  //     //   } catch (error) {
  //     //     console.error(error);
  //     //   }
  //     try {
  //       const response = await fetch(
  //         "https://www.googleapis.com/books/v1/mylibrary/bookshelves"
  //       );
  //       const result = await response.text();
  //       console.log(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   Api();
  // });
  useEffect(() => {
    async function totaldatatofirebase(state) {
      let updatedState = [
        ...state.fictionReducer[0],
        ...state.nonfictionReducer[0],
        ...state.adventureReducer[0],
        ...state.fantasyReducer[0],
      ];
      console.log(updatedState);
      const userCollection = collection(db, `TotalData`);
      const querySnapshot = await getDocs(userCollection);

      // Loop through each document and delete it
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log(`Document with ID ${doc.id} deleted successfully.`);
      });
      await addDoc(userCollection, { updatedState });
      console.log(state);
    }
    totaldatatofirebase(state);
    // console.log(auth, auth.AuthImpl.currentUser?.email);
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "update_User", payload: user });
      console.log(state);
    });

    return unsubscribe;
  }, [auth]);
  return (
    <>
      <div className="w-full">
        <Hero />
        <Section_1 />
        <Section_2 />
        <Section_3 />
        <Section_4 />
      </div>
    </>
  );
}
export default Home;
