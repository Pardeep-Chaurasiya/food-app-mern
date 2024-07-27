import express from "express";
import upload from "../utilies/multer.js";

import {
  addFood,
  deleteFood,
  listFood,
} from "../controllers/foodController.js";

const route = express.Router();

route.post("/add-food", upload.single("image"), addFood);
route.get("/list-food", listFood);
route.delete("/delete-food/:id", deleteFood);

export default route;
