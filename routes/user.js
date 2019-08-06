const express = require("express");
const router = express.Router();
const exphbs = require("express-handlebars");

// Login Routes
router.get("/login", (req, res) => {
  res.render("./users/login", { title: "DASH - Log in" });
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
});
// Register routes
router.get("/register", (req, res) => {
  res.render("./users/register", { title: "DASH - Register" });
});

router.post("/register", (req, res) => {
  res.send("registered");
});

module.exports = router;
