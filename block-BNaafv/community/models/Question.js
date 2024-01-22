var mongoose = require("mongoose");
const User = require("./User");
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  tags: [String],
  title: { type: String, required: true },
  description: String,
  author: {
    id: { types: Schema.Types.ObjectId },
    username: String,
  },
  answer: [{ type: String, ref: "Answer" }],
  slug: String,
});

questionSchema.pre("save", async (next) => {
  var title = this.title;
  if (title && this.isModified(title)) {
    this.slug = await slugger(title);
    next();
  } else {
    next("title not available");
  }
});

module.exports = mongoose.model("Question", questionSchema);
