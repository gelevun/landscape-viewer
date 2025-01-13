import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

  const onSubmit = async (values: PropertyFormValues) => {
    if (!session?.user?.id) {
      toast({
        variant: "destructive",
        title: "Lütfen giriş yapın",
      })
      return null
    }

    try {
      const propertyData = {
        ...values,
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
        
        return propertyId
      } else {
        const { data: newProperty, error } = await supabase
          .from("properties")
          .insert([{
            ...propertyData,
            status: "available" as const,
          }])
          .select()
          .single()

        if (error) throw error

        toast({
          title: "Arsa başarıyla oluşturuldu",
        })

        return newProperty.id
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        variant: "destructive",
        title: "Bir hata oluştu",
        description: "Lütfen tekrar deneyin.",
      })
      return null
    }
  }

  return {
    form,
    onSubmit,
  }
}