import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
// import UserAuth from "./pages/userAuth";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import { UserContext } from "./context/MyContext";
import { useEffect, useState } from "react";

function App() {
  const [userAuth, setUserAuth] = useState({});
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("user");
    isLoggedIn
      ? setUserAuth(JSON.parse(isLoggedIn))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route
            path="signin"
            element={!userAuth.access_token && <SignIn type="sign-in" />}
          />
          <Route path="signup" element={<SignOut type="sign-up" />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
