const express = require("express");
const authMiddleware = require("../Middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarController,
  getHospitalController,
  getOrganizationController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../Controllers/inventoryController");

const router = express.Router();

//routes

router.post("/create-inventory", authMiddleware, createInventoryController);
router.get("/get-inventory", authMiddleware, getInventoryController);
router.get(
  "/get-recent-inventory",
  authMiddleware,
  getRecentInventoryController
);
router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);
router.get("/get-donar", authMiddleware, getDonarController);
router.get("/get-hospital", authMiddleware, getHospitalController);
router.get("/get-organization", authMiddleware, getOrganizationController);
router.get(
  "/get-organization-for-hospital",
  authMiddleware,
  getOrganizationController
);

module.exports = router;
