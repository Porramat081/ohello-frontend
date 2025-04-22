import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().min(1, {
    message: "require at least 1 word for comment",
  }),
});
