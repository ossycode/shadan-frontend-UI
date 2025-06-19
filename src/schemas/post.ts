import { z } from "zod";

export const ContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  author: z.string().optional(),
  platform: z
    .enum(["instagram", "facebook", "tiktok", "twitter", "linkedin"])
    .optional()
    .default("instagram"),
  //   image: z.string().url().optional(),
  image: z.union([z.instanceof(File), z.string().url()]).optional(),
  likes: z.number().default(0),
  notes: z.string().optional(),

  // extra UI-only fields:
  status: z.enum(["draft", "review", "approved", "published"]).default("draft"),
  autoPost: z.boolean().default(true),
});
export type ContentForm = z.infer<typeof ContentSchema>;
