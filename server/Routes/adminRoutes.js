const express = require("express");
const authMiddleware = require("../Middlewares/authMiddleware");
const {
  getDonarListController,
  deleteDonarController,
  getHospitalListController,
  getOrgListController,
} = require("../Controllers/adminController");
const adminMiddleware = require("../Middlewares/adminMiddleware");
const {
  getHospitalController,
  getOrganizationController,
} = require("../Controllers/inventoryController");

//router object
const router = express.Router();

//Routes

//GET || DONAR LIST

router.get(
  "/donar-list",
  authMiddleware,
  adminMiddleware,
  getDonarListController
);

//GET || HOSPITAL LIST
router.get(
  "/hospital-list",
  authMiddleware,
  adminMiddleware,
  getHospitalListController
);

//GET || ORG LIST
router.get("/org-list", authMiddleware, adminMiddleware, getOrgListController);

//DELETE DONAR || GET
router.delete(
  "/delete-donar/:id",
  authMiddleware,
  adminMiddleware,
  deleteDonarController
);

//Exports

module.exports = router;
