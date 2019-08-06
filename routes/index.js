const express = require("express");
const router = express.Router();
const exphbs = require("express-handlebars");

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/service", (req, res) => {
  res.render("service");
});

module.exports = router;
