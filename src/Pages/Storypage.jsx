import { useParams } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MarkdownIt from "markdown-it";
import { useEffect, useRef, useState } from "react";
import Htmlconvertor from "../component/Htmlconvertor";
import Audioplayer from "../component/Audioplayer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { db } from "../Config";
import { useNavigate } from "react-router-dom";

import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  // getFirestore,
} from "firebase/firestore";
import { HashLoader } from "react-spinners";

const languages = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  zh: "Chinese",
  hi: "Hindi",
};

function Storypage() {
  const bookmarks = useSelector((state) => state.BookmarkReducer);
  // console.log(bookmarks);
  const authenticate = useSelector((state) => state.authenticationReducer);
  const dispatch = useDispatch();
  const { title } = useParams();
  const [story, setStory] = useState("");
  const [language, setLanguage] = useState("en");
  const [imgLink, setImgLink] = useState();
  const [isBookmark, setIsBookmark] = useState(false);
  const [isCurrentid, setIscurrentid] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // fetch story through AI

    async function fetchStory(title, language) {
      try {
        const API_KEY = "AIzaSyB7qZpIEkpyFzF9BoA_DuQIhw-xi8vvfa4";
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(
          `${title} story summary in ${languages[language]}`
        );
        const response = await result.response;
        const text = await response.text();

        const md = new MarkdownIt();
        const htmlMarkup = md.render(text);
        setStory(htmlMarkup);
      } catch {
        setStory("Something went wrong");
      }
    }
    fetchStory(title, language);

    // get total data through firebase

    async function getfirebaseData() {
      const querySnapshot = await getDocs(collection(db, `TotalData`));
      let userBookmark = querySnapshot.docs.map((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data());
        return doc.data();
      });
      console.log(userBookmark);
      userBookmark[0].updatedState.map((book) => {
        if (book.volumeInfo.title === title) {
          console.log(book.volumeInfo.imageLinks.thumbnail);
          setImgLink(book.volumeInfo.imageLinks.thumbnail);
          setIscurrentid(book.id);
        }
      });
    }
    getfirebaseData();
  }, [title, language]);

  useEffect(() => {
    setStory("");
  }, [language]);

  useEffect(() => {
    bookmarks.map((book) => {
      if (book.title === title) {
        setIsBookmark(true);
      }
    });
  }, [isBookmark]);

  // function to handle store and delete data in firebase

  async function handleBookmark() {
    const existingBookmark = bookmarks.find((bkt) => bkt.title === title);

    // const db = getFirestore();
    const userCollection = collection(
      db,
      `Bookmarkdata/${authenticate.uid}/data`
    );
    const querySnapshot = await getDocs(userCollection);

    // Loop through each document and delete it
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log(`Document with ID ${doc.id} deleted successfully.`);
    });

    if (existingBookmark) {
      const updatedBookmarks = bookmarks.filter((bkt) => bkt.title !== title);

      // Save updated bookmarks to Firebase
      const docRef = await addDoc(userCollection, { updatedBookmarks });
      console.log("Document written with ID: ", docRef.id);

      // Dispatch action to remove the bookmark
      dispatch({
        type: "REMOVE_BOOKMARK",
        payload: updatedBookmarks,
      });
    } else {
      const newBookmarks = [...bookmarks, { title: title, image: imgLink }];

      // Save new bookmarks to Firebase
      await addDoc(userCollection, { newBookmarks });

      // Dispatch action to add the bookmark
      dispatch({
        type: "ADD_BOOKMARK",
        payload: newBookmarks,
      });
    }
  }
  function movetoBackpage() {
    navigate(`/book/${isCurrentid}`);
  }
  return (
    <div className="text-black text-left w-full mt-12 lg:mt-0 md:mt-0">
      <h1 className="text-4xl text-center font-bold mt-5 text-[#e4842e]">
        {title}
      </h1>
      <div className="flex justify-between mx-auto w-[80%] my-3">
        <button className="text-gray-500" onClick={movetoBackpage}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="flex items-center">
          <div className="p-2 border inline-block mr-4">
            <i className="fa-solid fa-language"></i>
            <select
              className="bg-white"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {Object.entries(languages).map(([code, name]) => (
                <option className="bg-[#e4842e]" key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          {/* <button
            className="text-gray-500"
            onClick={() => {
              dispatch
              ({
                type: "Bookmark",
                payload: { title: title, image: imgLink },
              });
            }}
          >
            <i
              className={`${
                isBookmark ? "text-white" : "text-gray"
              } fas fa-bookmark`}
            ></i>
          </button> */}

          <button
            className="text-gray-500"
            onClick={() => {
              handleBookmark();
            }}
          >
            <i
              className={`${
                isBookmark ? "text-white" : "text-gray"
              } fas fa-bookmark`}
            ></i>
          </button>
        </div>
      </div>
      <div className=" mx-auto lg:w-[76%] md:w-[76%] w-full bg-white shadow-lg rounded-lg flex justify-center lg:h-[70vh] md:h-[70vh] overflow-scroll flex-col lg:flex-row md:flex-row">
        <Audioplayer
          story={story}
          language={language}
          title={title}
          img={imgLink}
          className=""
        />
        {story && <Htmlconvertor htmlContent={story} className="max-h-60" />}
        {!story && (
          <div className="w-[100%] flex items-center justify-center h-[100%]">
            {/* <div className="w-full h-full"> */}
            <HashLoader color="#e4842e" />
            {/* </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Storypage;
