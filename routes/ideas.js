const express = require("express");
const router = express.Router();
const Idea = require("../models/Ideas");
const { ensureAuthenticated } = require("../config/authenticate");
router.get("/", (req, res) => {
  Idea.find({})
    .sort({ date: "desc" })
    .then(ideas => {
      res.render("./ideas/idea", { title: "DASH - Home", ideas: ideas });
    })
    .catch(err => {
      throw err;
    });
});
// Ideas routes

router.get("/add", ensureAuthenticated, (req, res) => {
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
      idea: idea,
      user: req.user.id
    });
    ideas.save().then(() => {
      req.flash("success_msg", "Idea added successfully!");
      res.redirect("/idea");
    });
  }
});

// Edit
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  let condition = { _id: req.params.id };
  Idea.find(condition)
    .then(ideas => {
      res.render("./ideas/edit", { title: "Edit your Idea", ideas });
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});
// Update Route
router.put("/edit/:id", (req, res) => {
  let condition = { _id: req.params.id };
  const { author, title, idea } = req.body;
  Idea.findOne(condition).then(ideas => {
    ideas.title = title;
    (ideas.author = author), (ideas.idea = idea);

    ideas
      .save()
      .then(idea => {
        req.flash("success_msg", "Idea updated successfully");
        res.redirect("/idea");
      })
      .catch(err => {
        if (err) throw err;
      });
  });
});

// Delete routes
router.delete("/:id", (req, res) => {
  let condition = { _id: req.params.id };
  Idea.remove(condition)
    .then(() => {
      req.flash("success_msg", "Idea deleted successfully");
      res.redirect("/idea");
    })
    .catch(err => {
      if (err) throw err;
    });
});

module.exports = router;
