import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../Config";
import { useNavigate } from "react-router-dom";

function My_books() {
  const books = useSelector((state) => state.BookmarkReducer);
  // console.log(books);
  const authenticate = useSelector((state) => state.authenticationReducer);
  // console.log(authenticate);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function getfirebaseData() {
    // console.log(authenticate.uid);

    const querySnapshot = await getDocs(
      collection(db, `Bookmarkdata/${authenticate.uid}/data`)
    );
    let userBookmark = querySnapshot.docs.map((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      // console.log(doc.data());
      return doc.data();
    });
    // console.log(userBookmark);
    dispatch({ type: "ADD_BOOKMARK", payload: userBookmark[0].newBookmarks });
  }

  useEffect(() => {
    getfirebaseData();
  }, [authenticate]);
  function movetoStorypage(title) {
    navigate(`/story/${title}`);
  }
  function gotohomepage() {
    navigate("/");
  }
  return (
    <div className="w-full h-full">
      <div className="relative">
        <img
          src="https://wallpaperaccess.com/full/1884665.jpg"
          alt=""
          className="lg:h-[55vh] md:h-[45vh] h-[35vh] w-full"
        />
        <h1 className="text-white font-extrabold text-left lg:text-7xl md:text-7xl text-4xl mt-5 absolute top-20 lg:top-32 lg:left-32 md:left-32">
          MY BOOKSHELF
        </h1>
      </div>
      <h1 className=" text-3xl lg:text-4xl md:text-4xl font-extrabold mt-4 text-[#e4842e]">
        BOOKS TO READ
      </h1>
      <div className=" w-[76%] mx-auto  flex flex-wrap justify-evenly mt-10 pb-10">
        {books.length > 0 ? (
          books.map((book) => {
            return (
              <div
                key={book.title}
                className="text-black  lg:w-[21%] md:w-[31%] w-[45%] mx-auto h-[64%] shadow-lg inline-block mb-10"
                onClick={() => movetoStorypage(book.title)}
              >
                <img
                  src={book.image}
                  className="h-72 mx-auto"
                  alt={book.title}
                />
                {/* <p className="mt-4 shadow-lg text-xs font-bold text-[#e4842e]">
                  {book.title}
                </p> */}
              </div>
            );
          })
        ) : (
          <div className="text-black ">
            <h1 className="font-bold text-lg lg:text-4xl md:text-3xl">
              No Books found
            </h1>
          </div>
        )}
      </div>
      <p
        className="text-black text-sm lg:text-2xl md:text-xl underline pb-20"
        onClick={gotohomepage}
      >
        Continue Reading
      </p>
    </div>
  );
}
export default My_books;
