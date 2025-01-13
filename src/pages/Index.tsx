import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

const Index = () => {
  const session = useSession();
  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select(`*, property_images(url, is_primary)`);

      if (error) throw error;
      return data;
    },
  });

  const handleFilterChange = (filters: any) => {
    console.log("Filters changed:", filters);
    // Will implement filter logic later
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
        {/* Search Filters */}
        <SearchFilters onFilterChange={handleFilterChange} />

        {/* Properties Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : !properties?.length ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Henüz ilan bulunmuyor</h3>
            <p className="text-muted-foreground">
              İlk ilanı oluşturmak için "İlan Ver" butonuna tıklayın
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