import { z } from "zod";

// Question schema
export const questionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Question text is required"),
});

export type Question = z.infer<typeof questionSchema>;

// Student submission schema
export const submissionSchema = z.object({
  studentName: z.string().min(1, "Student name is required"),
  answers: z.record(z.string(), z.boolean()),
});

export type Submission = z.infer<typeof submissionSchema>;
