const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    email: String,
    fullname: String,
    password: String,
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("User", UserSchema);
module.exports = userModel;
