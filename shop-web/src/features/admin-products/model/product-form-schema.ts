import { z } from "zod";

export const productFormSchema = z.object({
  title: z.string().min(2, "Title must contain at least 2 characters"),
  description: z
    .string()
    .min(5, "Description must contain at least 5 characters"),
  price: z.number().positive("Price must be greater than 0"),
  imageUrl: z.url("Please enter a valid URL"),
  category: z.string().min(2, "Category must contain at least 2 characters"),
  inStock: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
