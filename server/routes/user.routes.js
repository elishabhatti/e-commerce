import { Router } from "express";
import {
  loginUser,
  getProfileData,
  logoutUserFromServer,
  registerUser,
  updateProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
} from "../controller/user.controller.js";
import { verifyAuthentication } from "../middlewares/verifyAuthentication.js";

const router = Router();

router.post("/register", registerUser);
router.get("/profile", verifyAuthentication, getProfileData);
router.post("/verify-email", verifyAuthentication, verifyEmail);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);
router.post("/logout", logoutUserFromServer);
router.put("/update-profile", verifyAuthentication, updateProfile);

export default router;
