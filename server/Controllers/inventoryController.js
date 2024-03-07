const mongoose = require("mongoose");
const inventoryModel = require("../Models/inventoryModel");
const userModel = require("../Models/userModel");

const createInventoryController = async (req, res) => {
  try {
    //validation
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donor account");
    // }

    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (req.body.inventoryType === "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);
      console.log("Organization:", organization);
      console.log("Requested Blood Group:", requestedBloodGroup);
      //calculate Blood Quantity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      console.log("total In", totalInOfRequestedBlood);

      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //total Out
      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;
      //in and out cal
      const availableQuantityOfBloodGroup = totalIn - totalOut;

      //quantity validation
      if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    //save record

    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(200).send({
      success: true,
      message: "New Blood Record Added",
    });

    // If all validations pass, proceed with your logic here...
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Create inventory API",
      error: error.message, // Changed to error.message to send only the error message
    });
  }
};

//get all blood Record

const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    console.log("hdd");
    return res.status(200).send({
      success: true,
      message: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All inventory API",
      error,
    });
  }
};
//get Hospital blood Record

const getInventoryHospitalController = async (req, res) => {
  try {
    console.log("sysug");
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organization")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get consumer Inventory",
      error,
    });
  }
};

//get Blood Record of 3
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "recent Inventory Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Recent Inventory",
      error,
    });
  }
};

//Get donar Record

const getDonarController = async (req, res) => {
  try {
    const organization = req.body.userId;
    //find donar
    const donarId = await inventoryModel.distinct("donar", {
      organization,
    });
    const donar = await userModel.find({ _id: { $in: donarId } });

    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched Successfully",
      donar,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar records",
      error,
    });
  }
};

const getHospitalController = async (req, res) => {
  try {
    const organization = req.body.userId;
    //get hospital id
    const hospitalId = await inventoryModel.distinct("hospital", {
      organization,
    });
    const hospital = await userModel.find({ _id: { $in: hospitalId } });

    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched Successfully",
      hospital,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in  Get Hospital API",
      error,
    });
  }
};
const getOrganizationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await inventoryModel.distinct("organization", { donar });
    //find ORG
    const organizations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "ORG data fetched Successfully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in  Get ORG API",
      error,
    });
  }
};
const getOrganizationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organization", { hospital });
    //find ORG
    const organizations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: " Hospital ORG data fetched Successfully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in  Get Hospital ORG API",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarController,
  getHospitalController,
  getOrganizationController,
  getOrganizationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
