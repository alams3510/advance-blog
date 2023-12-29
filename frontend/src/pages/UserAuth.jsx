import React, { useContext, useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import AnimationWrapper from "../components/animation";
import { enqueueSnackbar } from "notistack";
import axiosInstance from "../config";
import { storeInSession } from "../common/session";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/spinner";
import { UserContext } from "../context/MyContext";
import { authWithGoogle } from "../common/firebase";

const UserAuth = ({ type }) => {
  const {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  // console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //creating the user
    if (type === "sign-up") {
      try {
        setloading(true);
        await axiosInstance.post("auth/signup", user);
        setloading(false);
        navigate("/signin");
      } catch (error) {
        setloading(false);
        enqueueSnackbar(error.response.data.error, { variant: "warning" });
      }
    } else {
      // logging In User
      const { fullname, ...signInData } = user;
      try {
        setloading(true);
        const res = await axiosInstance.post("auth/signin", signInData);
        setloading(false);
        setUserAuth(res.data);
        navigate("/");

        storeInSession("user", JSON.stringify(res.data));
      } catch (error) {
        setloading(false);
        enqueueSnackbar(error.response.data.error, { variant: "warning" });
      }
    }
  };

  //Google-Auth
  const userAuthServer = (url, data) => {
    axiosInstance
      .post(url, data)
      .then((res) => {
        storeInSession("user", JSON.stringify(res.data));
        setUserAuth(res.data);
      })
      .catch((err) => {
        enqueueSnackbar(err.message),
          {
            variant: "error",
          };
      });
  };

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    authWithGoogle()
      .then((user) => {
        let url = "auth/google-auth";
        let data = {
          access_token: user.accessToken,
        };
        userAuthServer(url, data);
      })
      .catch((err) => enqueueSnackbar(err.response.data.error), {
        variant: "error",
      });
  };

  return access_token ? (
    navigate("/")
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="flex items-center justify-center flex-col h-[calc(100vh-6rem)] ">
        {loading && <Spinner />}
        <form
          onSubmit={handleSubmit}
          className="w-[80%] md:w-[50%] lg:w-[40%] flex flex-col justify-center items-center "
        >
          <h1 className="text-4xl font-gelasio-400 capitalize text-center mb-10 mt-10 font-serif">
            {type === "sign-in" ? "Welcome back" : "Join us today"}
          </h1>

          {type === "sign-up" ? (
            <InputBox
              type="text"
              name="fullname"
              placeholder="Full Name"
              icon="user"
              value={user.fullname}
              onChange={handleChange}
            />
          ) : (
            ""
          )}

          <InputBox
            type="email"
            name="email"
            placeholder="Email"
            icon="email"
            value={user.email}
            onChange={handleChange}
          />

          <InputBox
            type="password"
            name="password"
            placeholder="Password"
            icon="password"
            value={user.passsowrd}
            onChange={handleChange}
          />
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-auto flex gap-2 items-center  px-4 py-2 bg-gray-600 text-white my-6 rounded-full capitalize hover:bg-gray-800 active:bg-gray-400"
            >
              {type.replace("-", " ")}
            </button>
          </div>

          <div className="flex w-full relative items-center gap-2 my-4 text-gray-400 font-bold">
            <hr className="w-1/2" />
            <p>OR</p>
            <hr className="w-1/2" />
          </div>

          <button
            className="w-[90%] px-4 py-2 bg-gray-600 text-white  rounded-full capitalize flex items-center justify-center gap-2 mb-2 hover:bg-gray-800 active:bg-gray-400"
            onClick={handleGoogleAuth}
          >
            <FcGoogle />
            continue with google
          </button>

          <div className="text-gray-500 my-4">
            {type === "sign-in" ? (
              <p>
                Don't have an account ?{" "}
                <Link
                  className="underline font-medium hover:text-gray-600"
                  to={"/signup"}
                >
                  Join Us Today
                </Link>
              </p>
            ) : (
              <p>
                Already a member ?{" "}
                <Link
                  className="underline font-medium hover:text-gray-600"
                  to={"/signin"}
                >
                  Sign in here.
                </Link>
              </p>
            )}
          </div>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuth;
