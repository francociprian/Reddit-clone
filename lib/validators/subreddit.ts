import { z } from 'zod'

export const SubfrandditValidator = z.object({
  name: z.string().min(3).max(21),
})

export const SubfrandditSubscriptionValidator = z.object({
  subfrandditId: z.string(),
})

export type CreateSubfrandditPayload = z.infer<typeof SubfrandditValidator>
export type SubscribeToSubfrandditPayload = z.infer<typeof SubfrandditSubscriptionValidator>