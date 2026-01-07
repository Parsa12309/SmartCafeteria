const mongoose = require("mongoose");

const rezerveSchame = new mongoose.Schema({
    name: String,
    amount: Number
});

module.exports = mongoose.model("Rezerve", rezerveSchame);