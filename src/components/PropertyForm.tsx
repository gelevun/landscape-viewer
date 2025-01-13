import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { PropertyFormFields } from "./property/PropertyFormFields"
import { PropertyFormValues } from "./property/PropertyFormTypes"
import { usePropertyForm } from "./property/usePropertyForm"

interface PropertyFormProps {
  initialData?: PropertyFormValues
  propertyId?: string
}

export function PropertyForm({ initialData, propertyId }: PropertyFormProps) {
  const { form, onSubmit } = usePropertyForm({ initialData, propertyId })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <PropertyFormFields form={form} />
        <Button type="submit">
          {propertyId ? "Güncelle" : "Oluştur"}
        </Button>
      </form>
    </Form>
  )
}