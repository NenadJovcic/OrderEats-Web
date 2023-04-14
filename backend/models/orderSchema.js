import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ready: {
    type: Boolean,
    default: false,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
