import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Config";
import Card from "../component/Card";

function Search() {
  const { searchQuery } = useParams();
  console.log(searchQuery);
  const [searchlist, setSearchlist] = useState([]);
  useEffect(() => {
    async function getfirebaseData() {
      const querySnapshot = await getDocs(collection(db, `TotalData`));
      let userBookmark = querySnapshot.docs.map((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data());
        return doc.data();
      });
      console.log(userBookmark);
      let Searchdata = userBookmark[0].updatedState.filter((book) => {
        if (
          book.volumeInfo.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        ) {
          console.log(book.volumeInfo.title);
          return book;
        }
      });
      setSearchlist(Searchdata);
    }
    getfirebaseData();
  }, [searchQuery]);
  return (
    <div className="w-full h-full">
      <div className="">
        <img
          src="https://images.unsplash.com/photo-1596444433591-b172e84a4755?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-[55vh] w-full"
        />
      </div>
      <h1 className="text-black font-extrabold text-4xl mt-10 mb-10">
        SEARCH RESULT
      </h1>
      <div className="lg:w-[76%] md:w-[76%] w-full mx-auto h-full text-black flex justify-center items-center flex-wrap">
        {searchlist.length > 0 &&
          searchlist.map((book) => {
            return <Card key={book.id} book={book} />;
          })}
      </div>
    </div>
  );
}
export default Search;
