const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const admin = require("./routes/admin");
const user = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/self");

app.use("/api/auth", authRoutes);
app.use("/api/admin", admin);
app.use("/api/user", user);

app.listen(5000, ()=> console.log("Server running on port 5000"))
