const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const User = require("../models/user");
const Outlet = require("../models/outlets");
const { login } = require("../middleware/auth");

router.get("/", async (req, res) => {
  //   console.log(req.user._id);
  let outlet = await User.findById(req.user._id)
    .populate("outlet")
    .select("outlet");
  //   console.log(outlet);
  //   console.log(outlet.outlet[0]._id);
  let order = await Outlet.findById(outlet.outlet[0]._id).populate("orders");

  console.log(order.orders);
  res.send(order);
});

module.exports = router;
