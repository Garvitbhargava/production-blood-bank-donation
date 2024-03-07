const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./Config/db");
const path = require("path");

dotenv.config();

//mongodb connection

connectDB();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/api/inventory", require("./Routes/inventoryRoutes"));
app.use("/api/analytics", require("./Routes/analyticsRoutes"));
app.use("/api/admin", require("./Routes/adminRoutes"));

//staic folder

app.use(express.static(path.join(__dirname, "../client/build")));

//STATIC ROUTE

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Port
const PORT = process.env.PORT || 5000;

// Listen
app.listen(PORT, () => {
  console.log(
    `Server is running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`.bgBlue.white
  );
});
