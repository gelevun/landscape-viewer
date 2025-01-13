import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters, { FilterState } from "@/components/SearchFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";

const Index = () => {
  const session = useSession();
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    propertyType: "",
    priceRange: "",
    sortBy: "newest",
    landType: "all",
    registrationStatus: "all-status",
  });

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties", filters],
    queryFn: async () => {
      let query = supabase
        .from("properties")
        .select(`*, property_images(url, is_primary)`);

      // Location filter
      if (filters.location) {
        query = query.or(`city.ilike.%${filters.location}%,address.ilike.%${filters.location}%`);
      }

      // Property type filter
      if (filters.propertyType) {
        query = query.eq('type', filters.propertyType);
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (max) {
          query = query.gte('price', min).lte('price', max);
        } else {
          query = query.gte('price', min);
        }
      }

      // Sort
      switch (filters.sortBy) {
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'price-asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price-desc':
          query = query.order('price', { ascending: false });
          break;
        case 'area-desc':
          query = query.order('size', { ascending: false });
          break;
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Arsalar</h1>
        {session && (
          <Link to="/properties/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              İlan Ver
            </Button>
          </Link>
        )}
      </div>

      <div className="space-y-6">
        <SearchFilters onFilterChange={handleFilterChange} />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div 
                key={n} 
                className="h-[400px] rounded-lg bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : !properties?.length ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">
              {filters.location || filters.propertyType || filters.priceRange 
                ? "Arama kriterlerinize uygun ilan bulunamadı" 
                : "Henüz ilan bulunmuyor"}
            </h3>
            <p className="text-muted-foreground">
              {filters.location || filters.propertyType || filters.priceRange 
                ? "Lütfen farklı filtreler deneyiniz" 
                : "İlk ilanı oluşturmak için 'İlan Ver' butonuna tıklayın"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
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
      </div>
    </div>
  );
};

export default Index;