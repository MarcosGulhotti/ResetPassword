import {
  createUserService,
  requestPasswordReset,
  resetPassword,
} from "../services/auth.service";
import { Request, Response } from "express";

const createUserController = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const user = await createUserService({
      email,
      password,
      name,
    });

    return res.status(201).json({ data: user });
  } catch (error) {
    return res.status(400).json({ message: (error as any).message });
  }
};

const resetPasswordRequestController = async (req: Request, res: Response) => {
  try {
    const requestPasswordResetService = await requestPasswordReset(
      req.body.email
    );
    return res.json(requestPasswordResetService);
  } catch (error) {
    return res.status(400).json({ message: (error as any).message });
  }
};

const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const resetPasswordService = await resetPassword({
      userId: req.body.userId,
      token: req.body.token,
      password: req.body.password,
    });
    return res.json(resetPasswordService);
  } catch (error) {
    return res.status(400).json({ message: (error as any).message });
  }
};

export {
  resetPasswordRequestController,
  resetPasswordController,
  createUserController,
};
