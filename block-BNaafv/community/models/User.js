var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

var userSchema = new Schema(
  {
    name: String,
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    image: String,
    bio: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.verifyPassword = async function (password) {
  try {
    var result = await bcrypt.compare(password, this.password);
    return result;
  } catch (err) {
    return err;
  }
};

userSchema.methods.signToken = async function () {
  var payload = { userId: this.id, email: this.email };
  try {
    var token = await jwt.sign(payload, process.env.SECRET);
    return token;
  } catch (err) {
    return err;
  }
};

userSchema.methods.userJSON = function (token) {
  return {
    token: token,
    email: this.email,
    username: this.username,
  };
};

module.exports = mongoose.model("User", userSchema);
