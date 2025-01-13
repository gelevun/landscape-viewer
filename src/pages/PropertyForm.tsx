import { PropertyForm } from "@/components/PropertyForm"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

export default function PropertyFormPage() {
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        toast({
          variant: "destructive",
          title: "Giriş Gerekli",
          description: "İlan eklemek için lütfen giriş yapın.",
        })
        navigate("/auth")
      }
    }

    checkAuth()
  }, [navigate, toast])

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="mb-8 text-3xl font-bold">Yeni İlan Ekle</h1>
      <PropertyForm />
    </div>
  )
}