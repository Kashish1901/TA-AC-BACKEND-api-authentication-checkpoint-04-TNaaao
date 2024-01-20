var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  tags: [String],
  title: String,
  description: String,
  author: {
    id: { types: Schema.Types.ObjectId },
    username: String,
  },
  slug:String
});
module.exports = mongoose.model();
