import React from "react";
import UserAuth from "./UserAuth";

const SignIn = ({ type }) => {
  return (
    <div>
      <UserAuth type={type} />
    </div>
  );
};

export default SignIn;
