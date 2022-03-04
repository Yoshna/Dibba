const express = require("express");
const router = express.Router();
const Outlet = require("../models/outlets");
const User = require("../models/user");
const { login } = require("../middleware/auth");

router.post("/", async (req, res) => {
  console.log(req.user);
  let user = await User.findById(req.user._id);
  let arr = [...user?.outlet];
  let outlet = new Outlet({
    ...req.body,
  });
  outlet = await outlet.save();
  arr.push(outlet._id);
  user.outlet = arr;
  await user.save();
  res.send(outlet);
});

router.get("/", async (req, res) => {
  let outlets = await Outlet.find({});
  //   console.log(outlets);
  res.send(outlets);
});

router.get("/:id", async (req, res) => {
  const outlet = await Outlet.findById(req.params.id);
  res.send(outlet);
});

module.exports = router;
