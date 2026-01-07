const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/authMiddleware");
const {getFood, byFood} = require("../controllers/user/foodController");
const {getProfile, increaseTheWalet} = require("../controllers/user/profileController");
const {getRezerve, decrease} = require("../controllers/user/rezerveController");

//VIEW FOOD
router.get("/view", verifyToken, getFood);
router.put("/view/:id",verifyToken, byFood);

//VIEW PROFILE
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, increaseTheWalet);

//VIEW REZERVE
router.get("/rezerve", verifyToken, getRezerve);
router.put("/rezerve/:id", verifyToken, decrease);
module.exports = router;