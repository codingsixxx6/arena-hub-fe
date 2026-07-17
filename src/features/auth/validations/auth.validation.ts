import z from "zod";
import { ROLE_OPTIONS } from "../constants";

export const authLoginSchema = z.object({
  email: z
    .string()
    .min(1, "email field is required")
    .email("invalid email format"),
  password: z.string().min(1, "password field is required"),
});

export const authRegisterSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "fullname is required")
    .max(150, "maximum 150 character"),
  email: z
    .string()
    .min(1, "email field is required")
    .email("invalid email format"),
  password: z.string().min(1, "password field is required"),
  confirmPassword: z.string().min(1, "please confirm your password"),
//   role: z.enum(ROLE_OPTIONS, "Role is not Available").default("PLAYER")
  
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Kata sandi tidak cocok",
        path: ["confirmPassword"],
      });
    };
});

export type authLoginInput = z.infer<typeof authLoginSchema>;
export type authRegisterInput = z.infer<typeof authRegisterSchema>;
