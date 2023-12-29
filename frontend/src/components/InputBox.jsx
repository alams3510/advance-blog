import React, { useState } from "react";
import { FaUser, FaKey, FaEye } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { GoEyeClosed } from "react-icons/go";

const InputBox = ({ type, name, id, value, placeholder, icon, onChange }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <div className="w-full mb-4 relative flex items-center">
        <input
          type={passwordVisible === true ? "text" : type}
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          onChange={onChange}
          required
          className="bg-gray-100 px-10 py-2 w-full placeholder:text-gray-400 outline-gray-300 rounded-md font-medium font-serif focus:bg-white hover:bg-gray-200"
        />
        {(icon === "user" && <FaUser className="absolute top-1/3 left-2" />) ||
          (icon === "email" && (
            <MdAlternateEmail className="absolute top-1/3 left-2" />
          )) ||
          (icon === "password" && (
            <FaKey className="absolute top-1/3 left-2" />
          ))}
        {type === "password" ? (
          passwordVisible ? (
            <FaEye
              className="absolute right-2 cursor-pointer"
              onClick={() => setPasswordVisible((prevVal) => !prevVal)}
            />
          ) : (
            <GoEyeClosed
              className="absolute right-2 cursor-pointer"
              onClick={() => setPasswordVisible((prevVal) => !prevVal)}
            />
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default InputBox;
