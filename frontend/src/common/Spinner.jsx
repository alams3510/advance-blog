import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ loading }) => {
  return (
    <div className=" w-full h-full absolute flex items-center justify-center top-0 bottom-0 bg-gray-100 opacity-50 z-50">
      <ClipLoader color="blue" loading={loading} size={30} />
    </div>
  );
};

export default Spinner;
