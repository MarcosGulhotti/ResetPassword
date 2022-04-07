import { Router } from "express";
import {
  resetPasswordController,
  resetPasswordRequestController,
} from "../controllers/auth.controller";
import { createUserController } from "../controllers/createUser.controller";

const router = Router();

router.post("/create", createUserController);
router.post("/request_reset", resetPasswordRequestController);
router.post("/reset", resetPasswordController);

export { router };
