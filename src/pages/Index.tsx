import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PropertyCard from "@/components/PropertyCard";
import Header from "@/components/Header";
import { useState } from "react";
import LocationFilter from "@/components/filters/LocationFilter";
import PropertyTypeFilter from "@/components/filters/PropertyTypeFilter";
import PriceRangeFilter from "@/components/filters/PriceRangeFilter";
import SortFilter from "@/components/filters/SortFilter";

const Index = () => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties", location, propertyType, priceRange, sortBy],
    queryFn: async () => {
      let query = supabase
        .from("properties")
        .select(`*, property_images(url, is_primary)`);

      // Apply filters
      if (location) {
        query = query.or(`city.ilike.%${location}%,address.ilike.%${location}%`);
      }

      if (propertyType) {
        query = query.eq("type", propertyType);
      }

      if (priceRange) {
        const [min, max] = priceRange.split("-");
        if (min) query = query.gte("price", min);
        if (max) query = query.lte("price", max);
      }

      // Apply sorting
      switch (sortBy) {
        case "price-asc":
          query = query.order("price", { ascending: true });
          break;
        case "price-desc":
          query = query.order("price", { ascending: false });
          break;
        case "area-desc":
          query = query.order("size", { ascending: false });
          break;
        default:
          query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <LocationFilter value={location} onChange={setLocation} />
          <PropertyTypeFilter value={propertyType} onChange={setPropertyType} />
          <PriceRangeFilter value={priceRange} onChange={setPriceRange} />
          <SortFilter value={sortBy} onChange={setSortBy} />
        </div>

        {/* Properties Grid */}
        {isLoading ? (
          <div className="text-center">Yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties?.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                price={property.price}
                size={property.size}
                address={property.address}
                city={property.city}
                type={property.type}
                imageUrl={
                  property.property_images?.find((img) => img.is_primary)?.url
                }
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;