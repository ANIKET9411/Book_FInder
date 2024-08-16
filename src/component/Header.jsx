import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../Config";
useNavigate;
const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "update_User", payload: user });
      // console.log(state);
    });

    return unsubscribe;
  }, [auth]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
    navigate(`/search/${searchQuery}`);
  };
  const gotoProfilepage = () => {
    navigate("/Profile");
  };
  const authenticate = useSelector((state) => state.authenticationReducer);
  console.log(authenticate);

  return (
    <header className=" shadow-md p-2 md:p-2 lg:p-4 bg-white fixed w-full z-30">
      <div className="flex items-center justify-between container mx-auto">
        <div className="flex items-center">
          {/* <img src="/path/to/logo.png" alt="Logo" className="h-10 w-10" /> */}
          <h1 className="text-2xl lg:text-3xl md:text-3xl font-bold ml-3 text-black">
            Book Finder
          </h1>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-center hidden lg:inline-flex md:inline-flex">
            <input
              type="text"
              placeholder="Enter book title or author"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded-l-lg w-5/6 focus:outline-none m-0"
            />
            <button
              onClick={handleSearch}
              className="bg-[#e4842e] p-2 rounded-r-lg font-semibold hover:bg-yellow-600 transition duration-200"
            >
              Search
            </button>
          </div>
          {!authenticate.uid && (
            <button
              onClick={gotoProfilepage}
              className="ml-7 rounded-lg font-bold"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
