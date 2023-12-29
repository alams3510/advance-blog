import React from "react";
import UserAuth from "./UserAuth";

const SignOut = ({ type }) => {
  return (
    <div>
      <UserAuth type={type} />
    </div>
  );
};

export default SignOut;
