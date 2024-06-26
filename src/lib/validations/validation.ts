import { z } from "zod";

const onBoardingFormSchema = z.object({
  profile_photo: z.string().optional(),
  fullname: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }),
  bio: z
    .string()
    .min(10, { message: "Minimum 10 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

const SignInFormSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export { onBoardingFormSchema, SignInFormSchema };
