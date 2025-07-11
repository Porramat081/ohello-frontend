import { z } from "zod";
import { MIN, MAX, EMAIL_ERROR } from "@/lib/contant";

export const commentSchema = z.object({
  content: z.string().min(MIN.content.value, {
    message: "require at least 1 word for comment",
  }),
});

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(MIN.firstname.value, { message: MIN.firstname.message })
      .max(MAX.firstname.value, { message: MAX.firstname.message })
      .regex(/^\S+$/, {
        message: "Username cannot contain spaces",
      }),
    surname: z
      .string()
      .min(MIN.surname.value, { message: MIN.surname.message })
      .max(MAX.surname.value, { message: MAX.surname.message })
      .regex(/^\S+$/, {
        message: "Surname cannot contain spaces",
      }),
    email: z.string().email({
      message: EMAIL_ERROR.format,
    }),
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
        message:
          "Password must be at least 8 characters, include one uppercase letter, one number, and one special character (!@#$%^&*)",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().email({
    message: EMAIL_ERROR.format,
  }),
  password: z.string().min(MIN.password.value, {
    message: MIN.password.message,
  }),
});

export const profileShema = z
  .object({
    firstName: z
      .string()
      .min(MIN.firstname.value, { message: MIN.firstname.message })
      .max(MAX.firstname.value, { message: MAX.firstname.message })
      .regex(/^\S+$/, {
        message: "Username cannot contain spaces",
      }),
    surname: z
      .string()
      .min(MIN.surname.value, { message: MIN.surname.message })
      .max(MAX.surname.value, { message: MAX.surname.message })
      .regex(/^\S+$/, {
        message: "Surname cannot contain spaces",
      }),
    email: z.string().email({
      message: EMAIL_ERROR.format,
    }),
    username: z
      .string()
      .min(6, { message: "Username must be at least 6 characters" })
      .max(15, { message: "Username must be at most 15 characters" })
      .regex(/^\S*$/, { message: "Username must not contain whitespace" })
      .optional()
      .or(z.literal("")),
    oldPassword: z.string().optional().or(z.literal("")),
    newPassword: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
        message:
          "Password must be at least 8 characters, include one uppercase letter, one number, and one special character (!@#$%^&*)",
      })
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string(),
    defaultValue: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
