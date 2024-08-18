import { useEffect, useState } from "react";
import Signinmain from "./SignInmain";
import { auth } from "../Config";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Signin() {
  const dispatch = useDispatch();
  const authenticate = useSelector((state) => state.authenticationReducer);
  const navigate = useNavigate();
  const [isSignin, setIsSignin] = useState("SIGN UP");
  const [isStatus, setIsStatus] = useState("SIGN IN");

  function changeIsSignin() {
    if (isSignin === "SIGN IN") {
      setIsSignin("SIGN UP");
      setIsStatus("SIGN IN");
    } else {
      setIsSignin("SIGN IN");
      setIsStatus("SIGN UP");
    }
  }
  useEffect(() => {
    console.log(auth);
    dispatch({ type: "update_User", auth });
  }, []);
  function gotohomepage() {
    navigate("/");
  }
  return (
    <div
      className="flex w-full flex-col sm:flex-row lg:flex-row md:flex-row h-[90vh]"
      style={{
        backgroundImage:
          'url("https://yourbetareader.com/wp-content/uploads/2017/03/books_lighter2.jpg")',
      }}
    >
      {/* Left Section */}
      <div className=" lg:flex flex-col justify-center items-center w-full lg:w-2/5 md:w-2/5  text-black p-8 h-full">
        <div className="text-center lg:pl-10 md:pl-10 mt-10 flex justify-center flex-col h-full items-center">
          <img
            src="https://bookstoborrow.com/static/media/logo1.d46f871c.png"
            alt=""
            className="w-[50%] mb-2"
            onClick={gotohomepage}
          />
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="mb-6">
            To keep connected with us please login with your personal
            information
          </p>
          {!authenticate && (
            <button
              onClick={changeIsSignin}
              className="px-6 py-2 text-[#e4842e] bg-white rounded-full font-semibold"
            >
              {isSignin}
            </button>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-full lg:w-3/5 md:w-3/5 p-8 bg-white">
        <Signinmain status={isStatus} />
      </div>
    </div>
  );
}

export default Signin;
