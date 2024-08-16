import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Htmlconvertor from "../component/Htmlconvertor";
const Detailspage = () => {
  const [book, setBook] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    async function getApi() {
      const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyDmqYbJ1-76htWK3vUItqwsdyinCkNPE1A`;
      let response = await fetch(url);
      let data = await response.json();
      // console.log(data.volumeInfo);
      setBook(data.volumeInfo);
    }
    getApi();
  }, []);
  function movetostorypage(title) {
    navigate(`/story/${title}`);
  }
  return (
    <div className=" mx-auto w-full lg:w-[76%] md:w-[76%] bg-white lg:shadow-lg md:shadow-lg rounded-lg flex flex-col lg:flex-row md:flex-row items-center h-full pt-16 lg:pt-0 md:pt-0">
      <div className="relative w-full h-full">
        <img
          className="w-full h-56 lg:h-full md:h-full object-cover"
          src={book.imageLinks?.large ?? book.imageLinks?.thumbnail}
          alt="Book Cover"
        />
      </div>
      <div className="p-6 relative">
        <div className="bg-white px-8 py-2 absolute lg:left-[-120px] md:left-[-120px] top-[-80px] lg:top-[45px] md:top-[45px] text-left mx-auto lg:mx-0 md:mx-0 shadow-lg">
          <h2 className="text-4xl font-extrabold text-gray-800">
            {book.title}
          </h2>
          <h3 className="text-gray-600 mb-2 text-lg">({book.authors})</h3>
        </div>
        <p className="text-xl text-left font-extrabold text-[#e4842e] mt-10 lg:mt-32 md:mt-28">
          DESCRIPTION
        </p>
        <p className="text-gray-700 mb-3 overflow-scroll max-h-60 h-min">
          <Htmlconvertor htmlContent={book.description} />
        </p>
        <div className="flex items-center justify-between w-[80%] mx-auto flex-wrap">
          <div className="text-sm text-gray-600 w-full lg:w-[55%] md:w-full">
            <p className="text-[#e4842e] font-extrabold">Publisher</p>
            <p className="font-semibold">{book.publisher}</p>
          </div>
          <div className="text-sm text-gray-600">
            <p className="text-[#e4842e] font-extrabold">Pages</p>
            <p className="font-semibold">{book.printedPageCount}</p>
          </div>
          <div className="text-sm text-gray-600">
            <p className="text-[#e4842e] font-extrabold">Rating</p>
            <p className="font-semibold">4.2</p>
          </div>
          <div className="text-sm text-gray-600">
            <p className="text-[#e4842e] font-extrabold">Published</p>
            <p className="font-semibold">{book.publishedDate}</p>
          </div>
        </div>
        <div>
          <button
            className="mt-10 mb-12 lg:mt-2 md:mt-2"
            onClick={() => movetostorypage(book.title)}
          >
            Full Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detailspage;
