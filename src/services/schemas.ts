import error from "@/services/error";
import { z } from "zod";

const passwordSchema = (t: (arg: string) => string) => z
  .string()
  .min(8, { message: error("REGISTRATION_FAILED_PASSWORD_TOO_SMALL") })
  .max(20, { message: error("REGISTRATION_FAILED_PASSWORD_TOO_BIG") })
  .refine((password) => /[A-Z]/.test(password), {
    message: error("REGISTRATION_FAILED_PASSWORD_NEEDS_UPPERCASE_LETTER"),
  })
  .refine((password) => /[a-z]/.test(password), {
    message: error("REGISTRATION_FAILED_PASSWORD_NEEDS_LOWERCASE_LETTER"),
  })
  .refine((password) => /[0-9]/.test(password), {
    message: error("REGISTRATION_FAILED_PASSWORD_NEEDS_NUMBER"),
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: error("REGISTRATION_FAILED_PASSWORD_NEEDS_SPECIAL_CHAR"),
  });

const SignUpFormSchema = (t: (arg: string) => string) => z.object({
  name: z.string().min(2, {
    message: error("REGISTRATION_FAILED_FULLNAME_TOO_SMALL"),
  }),
  email: z.string().email(error("REGISTRATION_FAILED_EMAIL_INVALID")),
  password: passwordSchema(t),
});

const SignInFormSchema = (t: (arg: string) => string) => z.object({
  email: z.string().email(error("REGISTRATION_FAILED_EMAIL_INVALID")),
  password: passwordSchema(t),
});

const ResetPasswordFormSchemaFirstStep = (t: (arg: string) => string) => z.object({
  email: z.string().email(error("REGISTRATION_FAILED_EMAIL_INVALID")),
});

const ResetPasswordFormSchemaSecondStep = (t: (arg: string) => string) => z.object({
  newPassword: passwordSchema(t),
});

const VerifyEmailFormSchema = (t: (arg: string) => string) =>  z.object({});

export {
  SignUpFormSchema,
  SignInFormSchema,
  VerifyEmailFormSchema,
  ResetPasswordFormSchemaSecondStep,
  ResetPasswordFormSchemaFirstStep,
};
