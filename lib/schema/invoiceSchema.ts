import { z } from 'zod'

const descriptionRowSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().int().min(0).optional()
  ),
  rate: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0).optional()
  ),
  amount: z.preprocess(
    (val) => Number(val),
    z.number().min(0.01, "Amount must be greater than zero")
  ),
});

export const invoiceSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice Number is required"),
  name: z.string().min(1, "Your name is required"),
  email: z.string().email("Your email is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Invalid client email"),
  createdDate: z.string().datetime("Invalid created date"),
  dueDate: z.string().datetime("Due date is required"),
  descriptionRows: z.array(descriptionRowSchema).min(1, "At least one invoice item is required"),
  discountValue: z.string().optional(),
  discountType: z.enum(["$", "%"]).optional(),
  notes: z.string().optional(),
  amount: z.number().positive("Amount must be greater than 0"),
  subtotal: z.number().positive("subtotal must be greater than 0"),
  address: z.string().optional(),
  clientAddress : z.string().optional(),
});