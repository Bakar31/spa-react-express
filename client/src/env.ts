import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
});

export const validateEnv = () => {
  try {
    return envSchema.parse(import.meta.env);
  } catch (error) {
    console.error("Invalid environment variables:", error);
    throw new Error("Invalid environment variables");
  }
};

export const env = validateEnv();