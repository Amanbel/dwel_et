import {
  createUser,
  findUserByEmail,
} from "../../repositories/user.repository";

import { hashPassword, comparePassword } from "./password.service";

import { createAccessToken, createRefreshToken } from "./jwt.service";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existing = await findUserByEmail(email);

  if (existing) throw new Error("User exists");

  const passwordHash = await hashPassword(password);

  const user = await createUser({
    name,
    email,
    passwordHash,
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) throw new Error("Invalid credentials");

  const valid = await comparePassword(password, user.passwordHash);

  if (!valid) throw new Error("Invalid credentials");

  return {
    accessToken: createAccessToken(user.id),

    refreshToken: createRefreshToken(user.id),

    user,
  };
};
