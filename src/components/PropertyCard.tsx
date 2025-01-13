import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { MapPin, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  size: number;
  address: string;
  city: string;
  type: string;
  imageUrl?: string;
}

const PropertyCard = ({
  id,
  title,
  price,
  size,
  address,
  city,
  type,
  imageUrl,
}: PropertyCardProps) => {
  const session = useSession();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!session?.user) return;

      const { data, error } = await supabase
        .from("favorites")
        .select()
        .eq("property_id", id)
        .eq("user_id", session.user.id)
        .single();

      if (!error && data) {
        setIsFavorite(true);
      }
    };

    checkIfFavorite();
  }, [id, session?.user]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the heart button
    
    if (!session?.user) {
      toast({
        title: "Giriş yapmanız gerekiyor",
        description: "Favorilere eklemek için lütfen giriş yapın.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("property_id", id)
          .eq("user_id", session.user.id);

        if (error) throw error;
        setIsFavorite(false);
        toast({
          title: "Favorilerden kaldırıldı",
          description: "İlan favorilerinizden kaldırıldı.",
        });
      } else {
        const { error } = await supabase.from("favorites").insert({
          property_id: id,
          user_id: session.user.id,
        });

        if (error) throw error;
        setIsFavorite(true);
        toast({
          title: "Favorilere eklendi",
          description: "İlan favorilerinize eklendi.",
        });
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/property/${id}`}>
        <div className="aspect-[16/9] relative">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className="object-cover w-full h-full"
          />
          <Badge className="absolute top-2 right-2">{type}</Badge>
          <Button
            size="icon"
            variant={isFavorite ? "default" : "outline"}
            className="absolute top-2 left-2 bg-white hover:bg-white/90"
            onClick={toggleFavorite}
            disabled={isLoading}
          >
            <Heart
              className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
            />
          </Button>
        </div>
        <CardHeader>
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm line-clamp-1">
              {address}, {city}
            </span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Ruler className="h-4 w-4 mr-1" />
            <span className="text-sm">{size} m²</span>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-lg font-bold text-primary">{formatPrice(price)}</p>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default PropertyCard;