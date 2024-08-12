import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt"];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized! No token provided" });
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodeToken) {
      return res.status(400).json({ error: "Invalid token" });
    }
      const user = await User.findById(decodeToken.userId).select("-password");
      if (!user) {
          return res.status(404).json({error: "User not found"})
      }
    req.user = user;
    next();
  } catch (error) {
    console.log("error in protectroute middleware");
    return res.status(500).json({ error: "Internal Server error" });
  }
};
