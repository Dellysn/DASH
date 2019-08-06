const express = require("express");
const router = express.Router();
const exphbs = require("express-handlebars");

const Idea = require("../models/Ideas");
router.get("/", (req, res) => {
  Idea.find({}, (err, ideas) => {
    if (err) throw err;
    res.render("./ideas/idea", { title: "DASH - Home", ideas: ideas });
  });
});
// Ideas routes

router.get("/add", (req, res) => {
  res.render("./ideas/add-story", { title: "DASH - Add stories" });
});
router.post("/add", (req, res) => {
  const { title, author, idea } = req.body;
  let errors = [];

  if (!title) {
    errors.push({
      text: "Please add title"
    });
  }
  if (!author) {
    errors.push({
      text: "Please add author"
    });
  }
  if (!idea) {
    errors.push({
      text: "Please add idea"
    });
  }
  if (errors.length > 0) {
    res.render("./ideas/add-story", {
      errors: errors,
      author: author,
      title: title,
      idea: idea
    });
  } else {
    let ideas = new Idea({
      title: title,
      author: author,
      idea: idea
    });
    ideas.save().then(idea => {
      res.redirect("/");
    });
  }
});

module.exports = router;