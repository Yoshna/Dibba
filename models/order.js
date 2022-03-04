const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  servicePeriod: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  order: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
  outletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet",
  },
  delivered: {
    type: Boolean,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
