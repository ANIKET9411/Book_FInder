import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Side_navbar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  function changeshow() {
    setShow((prev) => !prev);
  }
  function movetoMybookspage() {
    navigate("/My_books");
  }
  function movetoHomepage() {
    navigate("/");
  }
  function movetoProfilepage() {
    navigate("/Profile");
  }
  return (
    <div className="flex flex-row lg:flex-col md:flex-col lg:block md:block bg-[#303132] h-[10vh] lg:h-[90vh] md:h-[90vh] text-white fixed z-20 bottom-0 lg:top-20 w-full lg:w-max md:w-max justify-evenly">
      <div className="text-left hidden lg:block md:block">
        <button className="w-15 " onClick={changeshow}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      <div className="flex px-4 py-4" onClick={movetoHomepage}>
        <p>
          <i className="fa-solid fa-house"></i>
        </p>
        {show && <p className="w-[110px]">HOME</p>}
      </div>
      <div className="flex px-4 py-4" onClick={movetoProfilepage}>
        <p>
          <i className="fa-solid fa-user"></i>
        </p>
        {show && <p className="w-[110px]">PROFILE</p>}
      </div>
      <div className="flex px-4 py-4" onClick={movetoMybookspage}>
        <p>
          <i className="fa-solid fa-book"></i>
        </p>
        {show && <p className="w-[110px]">MY BOOKS</p>}
      </div>
    </div>
  );
}
export default Side_navbar;
