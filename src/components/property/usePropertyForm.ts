import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@supabase/auth-helpers-react"
import { PropertyFormValues, propertyFormSchema } from "./PropertyFormTypes"

interface UsePropertyFormProps {
  initialData?: PropertyFormValues
  propertyId?: string
}

export function usePropertyForm({ initialData, propertyId }: UsePropertyFormProps) {
  const { toast } = useToast()
  const navigate = useNavigate()
  const session = useSession()

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      size: initialData?.size || 0,
      bedrooms: initialData?.bedrooms || 0,
      bathrooms: initialData?.bathrooms || 0,
      address: initialData?.address || "",
      city: initialData?.city || "",
      type: initialData?.type || "",
    },
  })

  async function onSubmit(data: PropertyFormValues) {
    if (!session?.user?.id) {
      toast({
        variant: "destructive",
        title: "Lütfen giriş yapın",
      })
      return
    }

    try {
      const propertyData = {
        ...data,
        user_id: session.user.id,
      }

      if (propertyId) {
        const { error } = await supabase
          .from("properties")
          .update(propertyData)
          .eq("id", propertyId)

        if (error) throw error

        toast({
          title: "Arsa başarıyla güncellendi",
        })
      } else {
        const { error } = await supabase
          .from("properties")
          .insert(propertyData)

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

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  }
}