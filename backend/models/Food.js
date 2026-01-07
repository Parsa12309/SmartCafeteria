const mongoose = require("mongoose");

const foodSchame = new mongoose.Schema({
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model("Food", foodSchame);