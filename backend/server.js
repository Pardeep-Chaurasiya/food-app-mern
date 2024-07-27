import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import foodRoute from "./routes/foodRoutes.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/food", foodRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT ${process.env.PORT}`);
});
