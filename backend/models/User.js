const mongoose = require("mongoose");
const Rezerve    = require("./Rezerve");
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum:["user", "admin"], default: "user"},
    walet: {type: Number},
    enable: {type: Boolean},
    rezerve: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rezerve",
        default: []
    }]
});

userSchema.pre("save", function(next) {
    if(this.role !== "user") {
        this.walet = undefined;
        this.enable = undefined;
        this.rezerve = undefined;
    }
    else {
        if(this.walet === undefined) this.walet = 0;
        if(this.enable === undefined) this.enable = true;
    }
})

module.exports = mongoose.model("User", userSchema);