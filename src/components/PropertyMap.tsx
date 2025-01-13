import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useToast } from "@/components/ui/use-toast";

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  title: string;
}

const PropertyMap = ({ latitude, longitude, title }: PropertyMapProps) => {
  const { toast } = useToast();
  
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '0.5rem'
  };

  const center = {
    lat: latitude,
    lng: longitude
  };

  const handleError = () => {
    toast({
      variant: "destructive",
      title: "Harita yüklenemedi",
      description: "Lütfen daha sonra tekrar deneyin.",
    });
  };

  return (
    <LoadScript 
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      onError={handleError}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        <Marker
          position={center}
          title={title}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default PropertyMap;