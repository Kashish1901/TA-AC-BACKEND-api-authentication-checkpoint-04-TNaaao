var express = require("express");
var router = express.Router();
var Question = require("../models/Question");
var auth = require("../middelwares/auth");

router.post("/", auth.verifyToken, async (req, res, next) => {
  try {
    var question = await Question.create(req.body);
    var token = await user.signToken();

    res.json({ question });
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    var questions = await Question.find({});
    res.json({ questions });
  } catch (error) {
    return next(error);
  }
});

router.put("/", auth.verifyToken, async (req, res, next) => {
  try {
    var question = await Question.findOneAndUpdate({}, req.body);
    var token = await user.signToken();

    res.json({ question });
  } catch (error) {
    return next(error);
  }
});

router.delete("/", auth.verifyToken, async (req, res, next) => {
  try {
    var question = await Question.delete({});
    var token = await user.signToken();
  } catch (error) {
    return next(error);
  }
});
module.exports = router;
