import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/integrations/supabase/client"

const propertyFormSchema = z.object({
  title: z.string().min(2, {
    message: "Başlık en az 2 karakter olmalıdır.",
  }),
  description: z.string().optional(),
  price: z.string().transform(Number),
  size: z.string().transform(Number),
  bedrooms: z.string().transform(Number).optional(),
  bathrooms: z.string().transform(Number).optional(),
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

type PropertyFormValues = z.infer<typeof propertyFormSchema>

interface PropertyFormProps {
  initialData?: PropertyFormValues
  propertyId?: string
}

export function PropertyForm({ initialData, propertyId }: PropertyFormProps) {
  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      price: "",
      size: "",
      bedrooms: "",
      bathrooms: "",
      address: "",
      city: "",
      type: "",
    },
  })

  async function onSubmit(data: PropertyFormValues) {
    try {
      if (propertyId) {
        // Update existing property
        const { error } = await supabase
          .from("properties")
          .update(data)
          .eq("id", propertyId)

        if (error) throw error

        toast({
          title: "Arsa başarıyla güncellendi",
        })
      } else {
        // Create new property
        const { error } = await supabase
          .from("properties")
          .insert([data])

        if (error) throw error

        toast({
          title: "Arsa başarıyla oluşturuldu",
        })
      }

      navigate("/")
    } catch (error) {
      console.error("Error:", error)
      toast({
        variant: "destructive",
        title: "Bir hata oluştu",
        description: "Lütfen tekrar deneyin.",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Başlık</FormLabel>
              <FormControl>
                <Input placeholder="Arsa başlığı" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Açıklama</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Arsa açıklaması"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fiyat (TL)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Büyüklük (m²)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yatak Odası Sayısı</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banyo Sayısı</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arsa Tipi</FormLabel>
              <FormControl>
                <Input placeholder="Örn: İmarlı, Tarla" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres</FormLabel>
              <FormControl>
                <Input placeholder="Tam adres" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şehir</FormLabel>
              <FormControl>
                <Input placeholder="Şehir" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {propertyId ? "Güncelle" : "Oluştur"}
        </Button>
      </form>
    </Form>
  )
}