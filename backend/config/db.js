import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL);
  if (conn) console.log("Database connected successfully");
  else console.log("Connection error while connecting DB");
};

export default connectDB;
