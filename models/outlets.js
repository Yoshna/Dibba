const mongoose = require("mongoose");

const outletSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  timeFrom: {
    type: String,
    required: true,
  },
  timeTo: {
    type: String,
    required: true,
  },
  servicePeriod: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  menuList: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

const Outlet = mongoose.model("Outlet", outletSchema);

module.exports = Outlet;
