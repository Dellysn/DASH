const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./config/database.js");
const morgan = require("morgan");
const methodOverride = require("method-override");
const PORT = 3000;
const app = express();
// Load Routes
const user = require("./routes/user");
const ideas = require("./routes/ideas");
const index = require("./routes/index");
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Morgan
app.use(morgan("dev"));
// Active Database
mongoose
  .connect(config.MongoURI, { useNewUrlParser: true })
  .then(done => console.log("mongodB conected"))
  .catch(err => {
    console.log(err);
  });
// Handlebars middleware
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
  })
);

app.set("view engine", ".hbs");
// Method Override Middleware
app.use(methodOverride("_method"));
// Static Folders
app.use(express.static(path.join(__dirname, "public")));

// Routing
app.use("/user", user);
app.use("/idea", ideas);
app.use("/home", index);
// Index Route
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server connected on Port ${PORT}...`);
});
