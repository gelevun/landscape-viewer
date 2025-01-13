import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Ruler, Building2, Phone, Mail, Heart, Share2 } from "lucide-react";
import Header from "@/components/Header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Geçici mock veri
const mockPropertyDetail = {
  id: 1,
  title: "Deniz Manzaralı İmarlı Arsa",
  location: "Bodrum, Muğla",
  price: 2500000,
  area: 500,
  type: "İmarlı Arsa",
  description: "Bodrum'un en güzel koylarından birinde, deniz manzaralı, villa imarlı arsa. Tüm altyapı bağlantıları hazır.",
  features: [
    "Deniz Manzaralı",
    "Villa İmarlı",
    "Elektrik Bağlantısı Mevcut",
    "Su Bağlantısı Mevcut",
    "Yola Cepheli"
  ],
  images: [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
  ],
  seller: {
    name: "Ahmet Yılmaz",
    phone: "+90 555 123 4567",
    email: "ahmet@example.com"
  }
};

const PropertyDetail = () => {
  const { id } = useParams();
  const property = mockPropertyDetail;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* İlan Başlığı ve Temel Bilgiler */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{property.location}</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Ruler className="h-5 w-5 mr-2" />
              <span>{property.area} m²</span>
            </div>
            <div className="flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              <span>{property.type}</span>
            </div>
          </div>
        </div>

        {/* Fotoğraf Galerisi */}
        <div className="mb-8">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt={`${property.title} - Fotoğraf ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Kolon - İlan Detayları */}
          <div className="lg:col-span-2 space-y-8">
            {/* Fiyat Kartı */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Satılık</p>
                    <p className="text-3xl font-bold">{property.price.toLocaleString("tr-TR")} ₺</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Açıklama */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">İlan Açıklaması</h2>
                <p className="text-muted-foreground">{property.description}</p>
              </CardContent>
            </Card>

            {/* Özellikler */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Arsa Özellikleri</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sağ Kolon - İletişim Kartı */}
          <div>
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">İlan Sahibi</h2>
                <div className="space-y-4">
                  <p className="font-medium">{property.seller.name}</p>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                    <a href={`tel:${property.seller.phone}`} className="hover:text-primary">
                      {property.seller.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                    <a href={`mailto:${property.seller.email}`} className="hover:text-primary">
                      {property.seller.email}
                    </a>
                  </div>
                  <Button className="w-full">İletişime Geç</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetail;