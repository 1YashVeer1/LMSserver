import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        sucess: false,
        message: "All fields are required."
      })
    }
    const user = User.findOne({ email });
    if (user) {
      return res.status(400).json({
        sucess: false,
        message: "User already exist with this email"
      })
    }
    const hasedPassword = await bcrypt.hash(password, 10)
    await User.create({
      name,
      email,
      password: hasedPassword
    });
    return res.status(201).json({
      sucess: false,
      message: "Account created sucessfully."
    })

  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Failed to register"
    })

  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json(+{
        sucess: false,
        message: "All fields are required"
      })
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid user or password"
      })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid user or password"
      })
    }
    generateToken(res, user, `welcome back ${user.name}`)

  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Failed to login"
    })
  }
}