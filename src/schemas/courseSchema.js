import { z } from "zod";

const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], "Invalid level"),
});

export default courseSchema;