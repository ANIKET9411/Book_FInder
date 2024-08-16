import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ book }) => {
  const [randoms, setRandoms] = useState("000000");
  const navigate = useNavigate();

  useEffect(() => {
    const generateRandomColor = () => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      setRandoms(randomColor);
    };
    generateRandomColor();
  }, []);

  function gotoDetailspage(id) {
    navigate(`/book/${id}`);
  }

  return (
    <div
      className={`text-black shadow-md rounded-lg p-4 transform hover:scale-105 transition-transform w-[46%] sm:w-[29%] md:w-[29%] lg:w-[21%] xl:w-[18%] m-[2%] relative bg-white mb-10`}
      onClick={() => gotoDetailspage(book?.id)}
    >
      <div
        className="w-full h-52 flex justify-center rounded-2xl"
        style={{ backgroundColor: `#${randoms}` }}
      >
        <img
          src={
            book?.volumeInfo?.imageLinks?.thumbnail ??
            book?.volumeInfo?.imageLinks?.smallThumbnail
          }
          alt={book.volumeInfo?.title}
          className="w-[60%] h-52 object-cover rounded-md mb-4 mx-auto absolute top-[-10px]"
        />
      </div>
      <h3 className="font-semibold mt-4 text-xs lg:text-sm md:text-sm h-7 lg:h-9 md:h-6 overflow-scroll">
        {book.volumeInfo.title}
      </h3>
      <p className="text-sm mt-1 text-gray-600 h-6 lg:h-6 overflow-scroll">
        {book.volumeInfo.authors?.join(", ")}
      </p>
    </div>
  );
};

export default Card;
