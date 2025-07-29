import { z } from "zod";

export const loginSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be not more than 20 characters")
});

export type LoginSchema = z.infer<typeof loginSchema>;
