import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ruler, Home } from "lucide-react";
import { Link } from "react-router-dom";

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
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(price);
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