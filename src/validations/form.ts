import { ERROR } from "@/lib/messages";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: ERROR.REGISTRATION_FAILED_PASSWORD_TOO_SMALL })
  .max(20, { message: ERROR.REGISTRATION_FAILED_PASSWORD_TOO_BIG })
  .refine((password) => /[A-Z]/.test(password), {
    message: ERROR.REGISTRATION_FAILED_PASSWORD_NEEDS_UPPERCASE_LETTER,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: ERROR.REGISTRATION_FAILED_PASSWORD_NEEDS_LOWERCASE_LETTER,
  })
  .refine((password) => /[0-9]/.test(password), {
    message: ERROR.REGISTRATION_FAILED_PASSWORD_NEEDS_NUMBER,
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: ERROR.REGISTRATION_FAILED_PASSWORD_NEEDS_SPECIAL_CHAR,
  });

const SignUpFormSchema = z.object({
  name: z.string().min(2, {
    message: ERROR.REGISTRATION_FAILED_FULLNAME_TOO_SMALL,
  }),
  email: z.string().email(ERROR.REGISTRATION_FAILED_EMAIL_INVALID),
  password: passwordSchema,
});

const SignInFormSchema = z.object({
  email: z.string().email(ERROR.REGISTRATION_FAILED_EMAIL_INVALID),
  password: passwordSchema,
});

const ResetPasswordFormSchemaFirstStep = z.object({
  email: z.string().email(ERROR.REGISTRATION_FAILED_EMAIL_INVALID),
});

const ResetPasswordFormSchemaSecondStep = z.object({
  newPassword: passwordSchema,
});

const VerifyEmailFormSchema = z.object({});

export {
  SignUpFormSchema,
  SignInFormSchema,
  VerifyEmailFormSchema,
  ResetPasswordFormSchemaSecondStep,
  ResetPasswordFormSchemaFirstStep,
};
