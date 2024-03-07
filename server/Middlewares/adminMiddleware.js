const userModel = require("../Models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.userId);
    //check admin

    if (user?.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "AUTH FAILED",
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send({
      success: false,
      error,
      message: "Auth Failed, ADMIN API",
    });
  }
};
