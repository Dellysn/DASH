const mongoose = require("mongoose");

const IdeasSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  idea: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

let Idea = mongoose.model("Idea", IdeasSchema);
module.exports = Idea;
