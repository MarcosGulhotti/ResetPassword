import { Request, Response } from "express";
import { createUserService } from "../services/auth.service";

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

export { createUserController };
