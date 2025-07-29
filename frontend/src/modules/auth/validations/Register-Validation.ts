import { z } from "zod";

export const registerSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be not more than 50 characters"),
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be not more than 20 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  userType: z.enum(["student", "teacher"])
});

export type RegisterSchema = z.infer<typeof registerSchema>;