var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Question = require("../models/Question");
var answerSchema = new Schema(
  {
    text: String,
    author: {
      username: { type: Schema.Types.ObjectId, ref: "User" },
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model();
