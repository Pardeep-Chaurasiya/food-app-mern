import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await userModel.findOne({ email });
    if (!userExists)
      return res.json({
        success: false,
        mesaage: "Invalid Creds",
      });

    if (!validator.isEmail(email))
      return res.json({
        success: false,
        mesaage: "Please enter valid email",
      });

    const userPassword = await bcrypt.compare(password, userExists.password);

    if (!userPassword) {
      return res.json({
        success: false,
        mesaage: "Invalid Creds",
      });
    }
    const token = createToken(userExists._id);
    return res.json({
      success: true,
      message: "Logged-in successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      mesaage: "Error while logging",
    });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: "30m" });
};

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const userExists = await userModel.findOne({ email });
    if (userExists)
      return res.json({
        success: false,
        mesaage: "User Already exists with email",
      });

    if (!validator.isEmail(email))
      return res.json({
        success: false,
        mesaage: "Please enter valid email",
      });

    if (password.length < 8) {
      return res.json({
        success: false,
        mesaage: "Please enter 8 digit strong password",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ email, name, password: hashPassword });
    await newUser.save();
    newUser.password = undefined;

    const token = createToken(newUser._id);
    return res.json({
      success: true,
      message: "User Created Successfully",
      user: newUser,
      AccessToken: token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      mesaage: "Error while creating new user",
    });
  }
};

export { loginUser, registerUser };
