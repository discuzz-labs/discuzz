import { z } from "zod";

const SignUpFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }),
  email: z.string().email("This is not a valid email."),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const SignInFormSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export { SignUpFormSchema, SignInFormSchema };
