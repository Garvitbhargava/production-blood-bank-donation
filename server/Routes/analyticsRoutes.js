const express = require("express");
const authMiddleware = require("../Middlewares/authMiddleware");
const {
  bloodGroupDetailsController,
} = require("../Controllers/analyticsController");

const router = express.Router();

//routes

router.get("/bloodGroups-data", authMiddleware, bloodGroupDetailsController);

module.exports = router;
