const mongoose = require("mongoose");

const userShema = new mongoose.Schema(
  {
    isAmin: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      maxlength: 20,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      maxlength: 30,
      minlength: 10,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      require: true,
    },
    projectList: [],
    scopes: {
      type: String,
    },
  },
  { timestamps: true }
);

let User = mongoose.model("User", userShema);

module.exports = { User };
