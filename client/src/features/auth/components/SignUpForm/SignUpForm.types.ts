import { z } from "zod";
import { signUpSchema } from "./SignUpForm.schema";

export type TSignUpFormValues = z.infer<typeof signUpSchema>;
