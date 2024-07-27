import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  const { name, price, description, category } = req.body;
  const image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name,
    price,
    description,
    category,
    image: image_filename,
  });

  try {
    const newFood = await food.save();
    return res.json({ success: true, message: "Food added", data: newFood });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Food not created" });
  }
};

const listFood = async (req, res) => {
  try {
    const foodList = await foodModel.find();
    return res.json({ success: true, message: "Food List", data: foodList });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Food not fetched" });
  }
};

const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await foodModel.findById(id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(id);
    return res.json({ success: true, message: "Food Deleted" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Food not fetched" });
  }
};

export { addFood, listFood, deleteFood };
