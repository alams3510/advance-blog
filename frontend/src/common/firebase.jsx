// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPiJSO8IegcGAGm7aULFeM3rWiNOGaJ3o",
  authDomain: "advanceblog.firebaseapp.com",
  projectId: "advanceblog",
  storageBucket: "advanceblog.appspot.com",
  messagingSenderId: "115010946072",
  appId: "1:115010946072:web:a80657e926a5223938af6d",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((err) => console.log(err));
  return user;
};
