import { z } from "zod";
import { MIN, MAX } from "@/lib/contant";

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
});
