import { getRepository } from "typeorm";
import JWT from "jsonwebtoken";
import { User } from "../models/User.model";
import { ResetToken } from "../models/ResetToken.model";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { sendEmail } from "./sendEmail.service";

interface UserInterface {
  email: string;
  password: string;
  name: string;
}

const createUserService = async ({ email, password, name }: UserInterface) => {
  const usersRepository = getRepository(User);

  if (!email) {
    throw new Error("Missing Email");
  }

  const emailAlreadyExists = await usersRepository.findOne({ email });

  if (emailAlreadyExists) {
    throw new Error("E-mail already registered");
  }

  const user = usersRepository.create({
    email,
    password,
    name,
  });

  const token = JWT.sign({ id: user.id }, "jwtSecret");

  await usersRepository.save(user);

  return { ...user, token };
};

const requestPasswordReset = async (email: string) => {
  const usersRepository = getRepository(User);
  const tokenRepository = getRepository(ResetToken);

  const user = await usersRepository.findOne({ email });

  if (!user) throw new Error("User does not exist");

  console.log(user.password);

  let token = await tokenRepository.findOne({ userId: user.id });

  if (token) await tokenRepository.delete(token);

  let resetToken = crypto.randomBytes(32).toString("hex");

  const hash = await bcrypt.hash(resetToken, 8);

  const newToken = tokenRepository.create({
    userId: user.id,
    token: hash,
    createdAt: Date.now(),
  });

  await tokenRepository.save(newToken);

  await sendEmail({
    email: user.email,
    subject: "Password Reset Request",
    payload: { name: user.name, token: resetToken },
    template: "../templates/requestResetPassword.handlebars",
  });

  return { message: "Email sent!" };
};

interface ResetPasswordProps {
  userId: string;
  token: string;
  password: string;
}

const resetPassword = async ({
  userId,
  token,
  password,
}: ResetPasswordProps) => {
  const tokenRepository = getRepository(ResetToken);
  const usersRepository = getRepository(User);

  let passwordResetToken = await tokenRepository.findOne({ userId: userId });

  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }

  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }

  const hash = await bcrypt.hash(password, 8);

  await usersRepository.update({ id: userId }, { password: hash });

  const user = await usersRepository.findOne(userId);

  if (!user) {
    throw new Error("User not found");
  }

  sendEmail({
    email: user.email,
    subject: "Password Reset Successfully",
    payload: {
      name: user.name,
    },
    template: "./template/resetPassword.handlebars",
  });

  await tokenRepository.delete(passwordResetToken);

  return user;
};

export { createUserService, requestPasswordReset, resetPassword };
