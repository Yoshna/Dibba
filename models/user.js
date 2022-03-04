const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  outlet: [{ type: mongoose.Schema.Types.ObjectId, ref: "Outlet" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
