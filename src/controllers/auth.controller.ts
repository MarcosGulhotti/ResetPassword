import { requestPasswordReset, resetPassword } from "../services/auth.service";
import { Request, Response } from "express";

const resetPasswordRequestController = async (req: Request, res: Response) => {
  const requestPasswordResetService = await requestPasswordReset(
    req.body.email
  );
  return res.json(requestPasswordResetService);
};

const resetPasswordController = async (req: Request, res: Response) => {
  const resetPasswordService = await resetPassword({
    userId: req.body.userId,
    token: req.body.token,
    password: req.body.password,
  });
  return res.json(resetPasswordService);
};

export { resetPasswordRequestController, resetPasswordController };
