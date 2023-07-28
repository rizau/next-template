import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>

export const stharSchema = z.object({
  STOK_KODU: z.string(),
  FISNO: z.string(),
  STHAR_TARIH: z.string(),
  STHAR_GCMIK: z.string(),
  STHAR_NF: z.string(),
})
