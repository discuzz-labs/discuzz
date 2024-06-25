import { z } from "zod";

const formSchema = z.object({
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

export default formSchema;
