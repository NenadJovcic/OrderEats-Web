import Menu from "../models/menuSchema.js";

export const menu_get = async (req, res) => {
  const menu = await Menu.find();
  res.status(200).json(menu);
};

export const menu_post = async (req, res) => {
  const { name, price, photo } = req.body;
  const menu = new Menu({ name, price, photo });
  await menu.save();
  res.status(201).json(menu);
};

export const menu_delete = async (req, res) => {
  const { id } = req.params;
  await Menu.findByIdAndDelete(id);
  res.status(200).json({ message: "Menu deleted" });
};
export const menu_put = async (req, res) => {
  const { id } = req.params;
  await Menu.findByIdAndUpdate(id, req.body);
  res.status(200).json({ message: "Menu Updated" });
};
