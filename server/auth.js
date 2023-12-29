const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./model/User");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = require("./advanceblog-firebase-adminsdk-5r1mb-3088901d00.json");

const router = express.Router();

let emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const generateID = (value) => {
  return Math.random().toString(36).slice(2).substring(0, value);
};

const generateUsername = async (email) => {
  let username = email.split("@")[0];
  try {
    const isUsernameExists = await User.exists({
      "personal_info.username": username,
    });
    if (isUsernameExists) {
      username = username + generateID(5);
    }
  } catch (error) {
    console.log(error);
  }

  return username;
};
const dataSendToFrontend = (res) => {
  const access_token = jwt.sign({ id: res._id }, process.env.SECRET_TOKEN_KEY);
  return {
    profile_img: res.personal_info.profile_img,
    username: res.personal_info.username,
    fullname: res.personal_info.fullname,
    access_token,
  };
};

// signup
router.post("/signup", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (fullname.length < 3) {
      return res.status(403).json({ error: "Fullname must be 3 letter long" });
    }
    if (!email) {
      return res.status(403).json({ error: "Enter email" });
    }
    if (!emailRegexp.test(email)) {
      return res.status(403).json({ error: "Invalid email" });
    }
    if (!passwordRegexp.test(password)) {
      return res.status(403).json({
        error:
          "Password should be 6 to 20 characters long with numeric, 1 lowercase and 1 uppercase letters",
      });
    }

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    let username = await generateUsername(email);

    let user = new User({
      personal_info: {
        fullname,
        email,
        password: hashedPassword,
        username,
      },
    });

    const response = await user.save();
    return res.status(200).json(dataSendToFrontend(response));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).json({ error: "Email already exists" });
    }
    return res.status(500).json({ error: error });
  }
});

// signin

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ "personal_info.email": email });
    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }
    if (!password) {
      return res.status(403).json({ error: "Enter the password" });
    }
    const isCorrectPassword = await bcrypt.compare(
      password,
      user.personal_info.password
    );
    if (!isCorrectPassword) {
      return res.status(403).json({ error: "Wrong password try again" });
    }
    return res.status(200).json(dataSendToFrontend(user));
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

//Google auth
router.post("/google-auth", async (req, res) => {
  let { access_token } = req.body;

  getAuth()
    .verifyIdToken(access_token)
    .then(async (decodedUser) => {
      let { name, email, picture } = decodedUser;
      let user = await User.findOne({ "personal_info.email": email })
        // .select({
        //   "personal_info.fullname": 1,
        //   "personal_info.username": 1,
        //   "personal_info.profile_img": 1,
        //   "google_auth:": 1,
        // })
        .then((u) => {
          return u || null;
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });
      if (user) {
        if (!user.google_auth) {
          //signin
          return res.status(403).json({
            error:
              "This email is Signed Up without google, please use Email & Password to login",
          });
        }
      } else {
        //signup
        let username = await generateUsername(email);

        user = new User({
          personal_info: {
            email: email,
            fullname: name,
            profile_img: picture,
            username: username,
          },
          google_auth: true,
        });
        await user
          .save()
          .then((u) => {
            return u;
          })
          .catch((err) => res.status(500).json({ error: err.message }));
      }
      return res.status(200).json(dataSendToFrontend(user));
    })
    .catch((err) => {
      return res.status(500).json({
        error: "Trouble with this Google account, try another account",
      });
    });
});

module.exports = router;
