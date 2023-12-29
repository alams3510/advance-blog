import React, { useContext, useState } from "react";
import logo from "../assets/blog-logo.svg";
import { Link, Outlet } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { UserContext } from "../context/MyContext";
import { CiBellOn } from "react-icons/ci";
import MenuPanel from "./MenuPanel";
import { removeFromSession } from "../common/session";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

  const [menuPanel, setMenuPanel] = useState(false);

  const {
    userAuth: { access_token, profile_img },
    setUserAuth,
  } = useContext(UserContext);

  const toggleMenuPannel = () => {
    setMenuPanel((prev) => !prev);
  };
  const hideMenuPanel = () => {
    setTimeout(() => {
      setMenuPanel(false);
    }, 300);
  };
  const logOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
  };
  return (
    <>
      <nav className="w-full flex items-center gap-5 px-8 py-4 border-b-2 border-gray-200 relative">
        <Link to="/">
          <img src={logo} alt="logo" className="w-10 object-cover" />
        </Link>
        <div
          className={`absolute w-full md:w-auto left-0 top-full mt-1 md:mt-0 border-b-2 md:border-0 py-4 px-8 md:relative md:inset-0 md:p-0 md:opacity-100 md:pl-4 ${
            searchBoxVisibility
              ? "block opacity-100 duration-200"
              : "opacity-0 duration-200"
          } `}
        >
          <input
            type="text"
            placeholder="Search"
            className="pl-6 pr-[12%] py- w-full placeholder:font-medium md:placeholder:text-md outline-gray-300 placeholder:text-gray-900 md:w-auto rounded-full bg-gray-100 py-2 md:pl-12 hover:bg-gray-200"
          />
          <FaSearch className="absolute right-[10%] top-1/2 -translate-y-1/2 md:left-7 md:text-xl cursor-pointer active:scale-125 md:text-gray-600" />
        </div>

        <div className="flex gap-3 md:gap-6 ml-auto items-center">
          <button
            className="bg-gray-200 p-3 rounded-full cursor-pointer md:hidden hover:bg-gray-300 active:bg-gray-400 
        "
            onClick={() => setSearchBoxVisibility((prevVal) => !prevVal)}
          >
            <FaSearch className="text-xl" />
          </button>
          <Link
            to="/editor"
            className="hidden md:flex gap-1 items-center hover:bg-gray-200 px-4 py-2 text-md font-thin hover:duration-200 rounded-md"
          >
            <FaRegEdit className="text-xl text-gray-500 " />
            Write
          </Link>
          {access_token ? (
            <>
              <Link
                onClick={logOutUser}
                to="/signin"
                className="bg-gray-100 text-black rounded-full w-[5.5rem] h-10 items-center justify-center md:flex hidden hover:bg-gray-200 active:bg-gray-300"
              >
                Sign Out
              </Link>
              <Link to="/dashboard/notification">
                <button className="bg-gray-200 text-black text-xl rounded-full w-11 h-11 flex items-center justify-center hover:bg-gray-300 active:bg-gray-400">
                  <CiBellOn size={25} />
                </button>
              </Link>
              <div
                className="relative flex"
                onClick={toggleMenuPannel}
                onBlur={hideMenuPanel}
              >
                <button
                  className="w-10 h-10 
                "
                >
                  <img
                    src={profile_img}
                    className="w-full h-full object-contain rounded-full border border-spacing-4 border-black cursor-pointer active:scale-110"
                  />
                </button>
                {menuPanel && <MenuPanel />}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="bg-gray-600 text-lime-50 rounded-full w-[5.5rem] h-10 flex items-center justify-center hover:bg-black active:bg-gray-400"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-gray-100 text-black rounded-full w-[5.5rem] h-10 items-center justify-center hidden md:flex hover:bg-gray-200 active:bg-gray-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
