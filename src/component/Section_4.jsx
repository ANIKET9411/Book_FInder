import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";

function Section_4() {
  const dispatch = useDispatch();
  const adventure = useSelector((state) => state.adventureReducer);
  useEffect(() => {
    async function getApi() {
      dispatch({ type: "remove_adventure" });
      const url =
        "https://www.googleapis.com/books/v1/volumes?q=subject:adventure&maxResults=30";
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
      let newdata = data.items.map((book) => {
        book.bookmark = false;
        console.log(book);
        return book;
      });
      dispatch({ type: "update_adventure", payload: newdata });
    }
    getApi();
  }, []);
  const [windowwidth, setWindowwidth] = useState(1025);
  function handlesize() {
    setWindowwidth(window.innerWidth);
  }
  window.addEventListener("resize", handlesize);
  useEffect(() => {
    setWindowwidth(window.innerWidth);
  }, []);
  return (
    <>
      <div className="flex justify-between lg:mx-32 md:mx-32 mx-4 my-10">
        <h1 className="text-black font-bold text-2xl lg:text-4xl md:text-4xl">
          ADVENTURE
        </h1>
        <button>All Item</button>
      </div>
      <div className="flex flex-wrap justify-between items-center lg:px-20 md:px-20 w-full  ">
        {adventure.map((books, index) => {
          return books.map((book, index) => {
            if (windowwidth >= 220 && windowwidth <= 639 && index < 2) {
              return <Card key={book.id} book={book} />;
            } else if (windowwidth >= 640 && windowwidth <= 1024 && index < 3) {
              return <Card key={book.id} book={book} />;
            } else if (windowwidth > 1024 && index < 4) {
              return <Card key={book.id} book={book} />;
            }
          });
        })}
      </div>
    </>
  );
}
export default Section_4;
