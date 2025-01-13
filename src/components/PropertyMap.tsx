import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  title: string;
}

const PropertyMap = ({ latitude, longitude, title }: PropertyMapProps) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '0.5rem'
  };

  const center = {
    lat: latitude,
    lng: longitude
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
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