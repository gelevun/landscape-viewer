import { z } from "zod"

export const propertyFormSchema = z.object({
  title: z.string().min(2, {
    message: "Başlık en az 2 karakter olmalıdır.",
  }),
  description: z.string().optional(),
  price: z.coerce.number().positive({
    message: "Fiyat pozitif bir sayı olmalıdır.",
  }),
  size: z.coerce.number().positive({
    message: "Büyüklük pozitif bir sayı olmalıdır.",
  }),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  address: z.string().min(5, {
    message: "Adres en az 5 karakter olmalıdır.",
  }),
  city: z.string().min(2, {
    message: "Şehir en az 2 karakter olmalıdır.",
  }),
  type: z.string().min(2, {
    message: "Arsa tipi en az 2 karakter olmalıdır.",
  }),
})

export type PropertyFormValues = z.infer<typeof propertyFormSchema>