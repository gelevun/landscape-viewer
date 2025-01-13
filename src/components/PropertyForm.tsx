import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { PropertyFormFields } from "./property/PropertyFormFields"
import { PropertyFormValues } from "./property/PropertyFormTypes"
import { usePropertyForm } from "./property/usePropertyForm"
import { PropertyImageUpload } from "./property/PropertyImageUpload"
import { useState } from "react"

interface PropertyFormProps {
  initialData?: PropertyFormValues
  propertyId?: string
}

export function PropertyForm({ initialData, propertyId }: PropertyFormProps) {
  const { form, onSubmit } = usePropertyForm({ initialData, propertyId })
  const [showImageUpload, setShowImageUpload] = useState(false)

  const handleFormSubmit = async (data: PropertyFormValues) => {
    const id = await onSubmit(data)
    if (id) {
      setShowImageUpload(true)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <PropertyFormFields form={form} />
        <Button type="submit">
          {propertyId ? "Güncelle" : "Oluştur"}
        </Button>

        {(showImageUpload || propertyId) && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Resimler</h3>
            <PropertyImageUpload
              propertyId={propertyId || ""}
              onUploadComplete={() => {}}
            />
          </div>
        )}
      </form>
    </Form>
  )
}