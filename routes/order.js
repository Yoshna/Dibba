const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const User = require("../models/user");
const Outlet = require("../models/outlets");
const { login } = require("../middleware/auth");

router.post("/", async (req, res) => {
  let user = await User.findById(req.user._id);
  // let outletId = user.outlet[0];
  // let outlet = await Outlet.findById(outletId);

  let order = new Order({
    ...req.body,
  });
  order = await order.save();
  let outletId = order.outletId;
  let outlet = await Outlet.findById(outletId);
  let arr = [...outlet?.orders];
  let arr1 = [...user?.orders];
  arr.push(order._id);
  arr1.push(order._id);
  outlet.orders = arr;
  user.orders = arr1;
  await outlet.save();
  await user.save();
  res.send(order);
});

router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        delivered: true,
      },
    },
    {
      new: true,
    }
  );
  if (!order) {
    res.status(404).send("order doesn't exist");
    return;
  }
  res.send(order);
});

router.get("/user", async (req, res) => {
  const result = [];
  const allOrders = await Order.find({}).populate("outletId");
  const userOrders = await User.findById(req.user._id).populate("orders");
  allOrders.map((ele) => {
    // console.log(ele._id);
    userOrders.orders.map((order) => {
      // console.log(order._id);
      if (ele._id.toString() === order._id.toString()) {
        // console.log("vbfg");
        result.push(ele);
      }
    });
  });
  // console.log(result);
  // const newOrder = await order.orders.map(async (o) => {
  //   const res = await Order.findById(o._id)
  //     .populate("outletId")
  //     .select("outletId");
  //   console.log(res);
  //   o.outletId = res.outletId;
  //   console.log(o);
  //   console.log("cvd");
  //   return o;
  // });
  // console.log(outlet);
  // console.log(order);
  res.send(result);
});

module.exports = router;
