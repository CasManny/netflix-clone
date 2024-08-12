import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookies } from "../lib/generateToken.js";
export const signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "password must be at least 6 characters" });
    }
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exist" });
    }
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).json({ error: "username already taken" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    const newUser = new User({
      email: email,
      password: hashedPassword,
      username: username,
      image: image,
    });
    generateTokenAndSetCookies(newUser._id, res);
    await newUser.save();
    return res.status(200).json({ user: { ...newUser._doc, password: "" } });
  } catch (error) {
    console.log("error in signup controller");
    res.status(500).json({ error: "internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const verifyEmail = await User.findOne({ email: email });
    if (!verifyEmail) {
      return res.status(404).json({ error: "invalid credentials" });
    }
    const verifyPassword = await bcrypt.compare(password, verifyEmail.password);
    if (!verifyPassword) {
      return res.status(400).json({ error: "password do not match" });
    }
    generateTokenAndSetCookies(verifyEmail._id, res);

    return res
      .status(200)
      .json({
        message: "login successful",
        user: { ...verifyEmail._doc, password: "" },
      });
  } catch (error) {
    console.log("Error in login controller");
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "logout successful" });
  } catch (error) {
    console.log("Error in logout controller");
    return res.status(500).json({ error: "internal server error" });
  }
};

export const authCheck = async (req, res) => {
  try {
    return res.status(200).json({user: req.user})
  } catch (error) {
    console.log("error in authcheck controller")
    return res.status(500).json({error: "Internal server error"})
  }
}
