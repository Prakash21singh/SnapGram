import * as z from "zod";

export const signUpValidationSchema = z.object({
  name: z.string().min(2, { message: "Too short" }),
  username: z.string().min(2, { message: "Too short" }).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

export const signInValidationSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 character!" }),
});
export const PostValidation = z.object({
  caption: z.string().min(5).max(2500),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(4),
  username: z.string().min(4),
  email: z.string().email({ message: "Invalid email format" }),
  bio: z.string(),
});

export const MessageValidation = z.object({
  chatId: z.string(),
  senderId: z.string(),
  content: z.string(),
});
