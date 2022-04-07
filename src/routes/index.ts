import { Router } from "express";
import {
  resetPasswordController,
  resetPasswordRequestController,
  createUserController
} from "../controllers/auth.controller";

const router = Router();

router.post("/create", createUserController);
router.post("/request_reset", resetPasswordRequestController);
router.post("/reset", resetPasswordController);

export { router };
