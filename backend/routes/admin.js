const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middleware/authMiddleware");
const {createFood, updateFood, deleteFood, getFood} = require("../controllers/admin/foodController");
const {getUser, enableUser} = require("../controllers/admin/userController");
//FOOD
router.get("/food/",verifyToken, getFood);
router.post("/food/",verifyToken, createFood);
router.put("/food/:id",verifyToken, updateFood);
router.delete("/food/:id",verifyToken, deleteFood);


//User
router.get("/AUser/", verifyToken, getUser);
router.put("/AUser/:id", verifyToken, enableUser)

module.exports = router;