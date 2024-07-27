import express from "express";

import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import authMiddelware from "../middlewares/auth.js";

const route = express.Router();

route.post("/add-cart", authMiddelware, addToCart);
route.post("/remove-cart", authMiddelware, removeFromCart);
route.get("/get-cart", authMiddelware, getCart);

export default route;
