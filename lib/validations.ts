import { z } from "zod";

export const BudgetFormValidation = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    amount: z
        .number()
        .or(z.string().regex(/\d+/).transform(Number))
        .refine((n) => n >= 0),
    icon: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
});
