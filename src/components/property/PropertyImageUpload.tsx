import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Loader2, Upload, UploadCloud } from "lucide-react"

interface PropertyImageUploadProps {
  propertyId: string
  onUploadComplete: () => void
}

export function PropertyImageUpload({ propertyId, onUploadComplete }: PropertyImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [is360Uploading, setIs360Uploading] = useState(false)
  const { toast } = useToast()

  const uploadImage = async (file: File, is360: boolean = false) => {
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${propertyId}/${crypto.randomUUID()}.${fileExt}`

      setIsUploading(is360 ? false : true)
      setIs360Uploading(is360)

      const { error: uploadError } = await supabase.storage
        .from("property-images")
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from("property-images")
        .getPublicUrl(fileName)

      const { error: dbError } = await supabase
        .from("property_images")
        .insert({
          property_id: propertyId,
          url: publicUrl,
          is_360: is360,
          is_primary: false
        })

      if (dbError) throw dbError

      toast({
        title: "Resim başarıyla yüklendi",
      })
      onUploadComplete()
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        variant: "destructive",
        title: "Resim yüklenirken bir hata oluştu",
        description: "Lütfen tekrar deneyin.",
      })
    } finally {
      setIsUploading(false)
      setIs360Uploading(false)
    }
  }

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>, is360: boolean = false) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        variant: "destructive",
        title: "Geçersiz dosya tipi",
        description: "Lütfen bir resim dosyası seçin.",
      })
      return
    }

    await uploadImage(file, is360)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="image">Resim Yükle</Label>
        <div className="mt-2">
          <Button
            variant="outline"
            className="w-full"
            disabled={isUploading || is360Uploading}
          >
            <label className="flex items-center justify-center w-full cursor-pointer">
              {isUploading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <UploadCloud className="w-4 h-4 mr-2" />
              )}
              Resim Seç
              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, false)}
                disabled={isUploading || is360Uploading}
              />
            </label>
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="image360">360° Resim Yükle</Label>
        <div className="mt-2">
          <Button
            variant="outline"
            className="w-full"
            disabled={isUploading || is360Uploading}
          >
            <label className="flex items-center justify-center w-full cursor-pointer">
              {is360Uploading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              360° Resim Seç
              <input
                id="image360"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, true)}
                disabled={isUploading || is360Uploading}
              />
            </label>
          </Button>
        </div>
      </div>
    </div>
  )
}