import { z } from 'zod'

export const userSchema = z.object({
   email: z.string().email(),
   firstName: z.string(),
   lastName: z.string(),
   password: z.string()
})

export const updateUserSchema = z.object({
   firstName: z.string().optional(),
   lastName: z.string().optional(),
   password: z.string().optional()
})

export const transferMoneySchema = z.object({
   to: z.string(),
   amount: z.number()
})