import * as z from "zod";
export const productSchema = z.object({
  title: z.string().min(6).max(255),
  price: z.number().min(0),
  catagoryID: z.string(),
  description: z.string().optional(),
});
