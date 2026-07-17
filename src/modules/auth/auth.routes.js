import { Router } from "express";
import * as authController from "./auth.controller.js";
import validate from "../../common/middlware/validate.dto.js";
import RegisterDto from "./dto/register.dto.js";
import LoginDto from "./dto/login.dto.js";

const router = Router();

router.post("/register", validate(RegisterDto), authController.register);
router.post("/login", validate(LoginDto), authController.login);
router.get("/me", authenticate, authController.getMe);

export default router;
