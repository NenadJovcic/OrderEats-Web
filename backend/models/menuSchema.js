import mongoose, { Schema } from "mongoose";

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
