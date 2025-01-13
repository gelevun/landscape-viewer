import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Ruler, Building } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  title: string;
  location: string;
  price: number;
  area: number;
  type: string;
  imageUrl: string;
  id: number;
}

const PropertyCard = ({ id, title, location, price, area, type, imageUrl }: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Ruler className="h-4 w-4 mr-1" />
            <span>{area} m²</span>
          </div>
          <div className="flex items-center">
            <Building className="h-4 w-4 mr-1" />
            <span>{type}</span>
          </div>
        </div>
        <div className="text-xl font-bold text-primary">
          {price.toLocaleString("tr-TR")} ₺
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" asChild>
          <Link to={`/property/${id}`}>Detayları Gör</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;