const mongoose = require("mongoose");

let profile_img_name_list = [
  "Garfield",
  "Tinkerbell",
  "Annie",
  "Loki",
  "Cleo",
  "Angel",
  "Bob",
  "Mia",
  "Coco",
  "Gra",
];

let profile_img_collection_list = [
  "notionists-neutral",
  "adventurer-neutral",
  "fun-emoji",
];

const userSchema = new mongoose.Schema(
  {
    personal_info: {
      fullname: {
        type: String,
        required: true,
        minlength: [3, "fullname must be more than 3 letters"],
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: String,
      username: {
        type: String,
        unique: true,
      },
      bio: {
        type: String,
        default: "",
      },
      profile_img: {
        type: String,
        default: () => {
          return `https://api.dicebear.com/7.x/${
            profile_img_collection_list[
              Math.floor(Math.random() * profile_img_collection_list.length)
            ]
          }/svg?seed=${
            profile_img_name_list[
              Math.floor(Math.random() * profile_img_name_list.length)
            ]
          }`;
        },
      },
    },
    social_links: {
      youtube: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      facebook: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
      website: {
        type: String,
        default: "",
      },
    },
    account_info: {
      total_posts: {
        type: Number,
        default: 0,
      },
      total_reads: {
        type: Number,
        default: 0,
      },
    },
    google_auth: {
      type: Boolean,
      default: false,
    },
    blogs: {
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
