import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useToast } from "@/components/ui/use-toast";

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  title: string;
}

const PropertyMap = ({ latitude, longitude, title }: PropertyMapProps) => {
  const { toast } = useToast();
  
  const position: [number, number] = [latitude, longitude];

  const handleError = () => {
    toast({
      variant: "destructive",
      title: "Harita yüklenemedi",
      description: "Lütfen daha sonra tekrar deneyin.",
    });
  };

  return (
    <MapContainer 
      center={position} 
      zoom={15} 
      style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}
      onError={handleError}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={defaultIcon}>
        <Popup>
          {title}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default PropertyMap;