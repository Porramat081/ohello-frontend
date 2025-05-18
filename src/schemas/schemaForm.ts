import { z } from "zod";
import { MIN, MAX, EMAIL_ERROR } from "@/lib/contant";

export const commentSchema = z.object({
  content: z.string().min(MIN.content.value, {
    message: "require at least 1 word for comment",
  }),
});

export const signUpSchema = z.object({
  firstname: z
    .string()
    .min(MIN.firstname.value, { message: MIN.firstname.message })
    .max(MAX.firstname.value, { message: MAX.firstname.message }),
  surname: z
    .string()
    .min(MIN.surname.value, { message: MIN.surname.message })
    .max(MAX.surname.value, { message: MAX.surname.message }),
  email: z.string().email({
    message: EMAIL_ERROR.format,
  }),
  password: z.string().min(MIN.password.value, {
    message: MIN.password.message,
  }),
});

export const signInSchema = z.object({
  email: z.string().email({
    message: EMAIL_ERROR.format,
  }),
  password: z.string().min(MIN.password.value, {
    message: MIN.password.message,
  }),
});
