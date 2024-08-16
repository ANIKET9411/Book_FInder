// SignUp.js
import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../Config";
import { useDispatch, useSelector } from "react-redux";

function Signinmain({ status }) {
  const state = useSelector((state) => state.authenticationReducer);

  // useEffect(() => {
  //   // dispatch({ type: "update_User", payload: auth });
  //   console.log(state?.currentUser?.email);
  // }, []);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const dispatch = useDispatch();
  async function SIGNUP(e) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass
      );
      console.log("User signed up:", userCredential.user);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  }
  async function SIGNOUT() {
    await signOut(auth);
    console.log("user signout successfully");
    console.log(auth);
    dispatch({ type: "remove_User" });
  }

  async function SIGNIN(e) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass
      );
      console.log("User signed in:", userCredential.user.uid);

      console.log(state);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  }
  function checkAuth(value) {
    console.log(typeof value);

    event.preventDefault();
    if (value === "SIGN IN") {
      SIGNIN();
    } else {
      SIGNUP();
    }
  }
  return (
    <div className="w-full max-w-md mb-10">
      <h2 className="text-3xl font-semibold text-[#e4842e] mb-6">
        Create Account
      </h2>

      <div className="flex justify-center space-x-4 mb-6">
        <a href="#" className="text-gray-500">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="text-gray-500">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="#" className="text-gray-500">
          <i className="fab fa-twitter"></i>
        </a>
      </div>

      <p className="text-center text-gray-500 mb-6">
        or use your email for registration
      </p>

      {!state.uid && (
        <form action="">
          {status !== "SIGN IN" && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e4842e]"
              />
            </div>
          )}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e4842e]"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              required
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e4842e]"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#e4842e] rounded-full font-semibold hover:bg-[#f9a963]"
            onClick={(e) => {
              checkAuth(e.target.innerText);
              // console.log(typeof e.target.innerText);
            }}
          >
            {status}
          </button>
        </form>
      )}
      {state.uid && <button onClick={SIGNOUT}>Signout</button>}
    </div>
  );
}

export default Signinmain;
