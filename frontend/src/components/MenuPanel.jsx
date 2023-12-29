import React, { useContext } from "react";
import AnimationWrapper from "./animation";
import { Link, useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { UserContext } from "../context/MyContext";
import { removeFromSession } from "../common/session";

const MenuPanel = () => {
  const navigate = useNavigate();
  const {
    userAuth: { username },
    setUserAuth,
  } = useContext(UserContext);

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
    navigate("signin");
  };
  return (
    <AnimationWrapper transition={{ duration: 0.2 }}>
      <div className="border bg-white rounded-sm border-gray-200 overflow-hidden duration-200 absolute right-0 top-12  z-50 w-[200px] md:hidden">
        <Link
          to={"/editor"}
          className="flex gap-3 justify-start items-center md:hidden px-8 py-2 hover:bg-gray-300"
        >
          <CiEdit />
          <p>Write</p>
        </Link>
        <Link
          to={`/user/${username}`}
          className="flex gap-3 justify-start items-center md:hidden px-8 py-2 hover:bg-gray-300"
        >
          Profile
        </Link>
        <Link
          to="/dashboard"
          className="flex gap-3 justify-start items-center md:hidden px-8 py-2 hover:bg-gray-300"
        >
          Dashboard
        </Link>
        <Link
          to="/setting/profile"
          className="flex gap-3 justify-start items-center md:hidden px-8 py-2 hover:bg-gray-300"
        >
          Settings
        </Link>
        <button
          onClick={signOutUser}
          className="md:hidden px-8 py-2 hover:bg-gray-300 w-full text-left border-t-2"
        >
          <h1 className="font-bold text-xl">Sign Out</h1>
          <p className="font-bold text-gray-500">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default MenuPanel;
