import * as userService from "../services/userService.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const registerUs = await userService.registerUser(req.body);
    res.status(200).json(registerUs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.authenticateUser(email, password);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login Successfull", token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const updateUser = await userService.updateUser(req.params.id, req.body);

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const deleteUs = await userService.deleteUser(req.params.id);

    if (!deleteUs) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(deleteUs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
