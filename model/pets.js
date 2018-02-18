const mongoose = require("mongoose");

/**
 * Our Pets model.
 *
 * 
 */
module.exports.Pets = mongoose.model("pets", new mongoose.Schema({
  name:    { type: String, required: true },
  cost:    { type: Number, require: true},
  flag:    { type: Number, require: false},
}));