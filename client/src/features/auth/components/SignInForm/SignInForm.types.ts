import { z } from "zod";
import { signInSchema } from "./SignInForm.schema";

export type TSignInFormValues = z.infer<typeof signInSchema>;
