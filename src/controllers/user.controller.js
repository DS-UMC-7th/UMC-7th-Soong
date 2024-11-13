import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res) => {
  try {
    const user = await userSignUp(req.body);
    res.status(200).json({ status: "success", message: "User signed up", data: user });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
