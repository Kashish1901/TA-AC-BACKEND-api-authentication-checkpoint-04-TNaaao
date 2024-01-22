var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var profileSchema = new Schema(
  {
    name: { type: Schema.Types.ObjectId, ref: "User" },
    username: { type: Schema.Types.ObjectId, ref: "User" },
    image: String,
    bio: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
