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
  const [isShow, setIsShow] = useState(false);
  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
    navigate(`/search/${searchQuery}`);
  };
  const gotoProfilepage = () => {
    navigate("/Profile");
  };
  const authenticate = useSelector((state) => state.authenticationReducer);
  // console.log(authenticate);
  function gotohomepage() {
    navigate("/");
  }
  return (
    <header className=" shadow-md p-2 px-4 md:p-2 lg:p-4 bg-white fixed w-[100vw] z-30">
      <div className="flex items-center justify-between container mx-auto w-full">
        {!isShow && (
          <div className="flex items-center">
            {/* <img src="/path/to/logo.png" alt="Logo" className="h-10 w-10" /> */}
            <img
              src="https://bookstoborrow.com/static/media/logo1.d46f871c.png"
              alt=""
              className="w-[30%] sm:w-[20%] md:w-[20%] lg:w-[15%] cursor-pointer"
              onClick={gotohomepage}
            />
          </div>
        )}
        {!isShow && (
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
        )}
        <div className="lg:hidden md:hidden flex justify-between">
          {isShow && (
            <div className="flex justify-center w-full ">
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
          )}
          <div
            className="flex items-center justify-center w-8 h-8 p-5 rounded-full bg-[#e4842e] text-2xl"
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            {!isShow && <i className="fa-solid fa-magnifying-glass"></i>}
            {isShow && <i className="fa-solid fa-xmark"></i>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
