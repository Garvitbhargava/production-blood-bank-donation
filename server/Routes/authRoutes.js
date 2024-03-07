const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../Controllers/authController");
const authMiddleware = require("../Middlewares/authMiddleware");

const router = express.Router();

//routes

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/current-user", authMiddleware, currentUserController);

module.exports = router;
