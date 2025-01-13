import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { FilterState } from "@/types/filters";
import LocationFilter from "./filters/LocationFilter";
import PropertyTypeFilter from "./filters/PropertyTypeFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import SortFilter from "./filters/SortFilter";
import AdvancedFilters from "./filters/AdvancedFilters";

interface SearchFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    propertyType: "",
    priceRange: "",
    sortBy: "newest",
    landType: "all",
    registrationStatus: "all-status",
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <LocationFilter
          value={filters.location}
          onChange={(value) => handleFilterChange("location", value)}
        />
        <PropertyTypeFilter
          value={filters.propertyType}
          onChange={(value) => handleFilterChange("propertyType", value)}
        />
        <PriceRangeFilter
          value={filters.priceRange}
          onChange={(value) => handleFilterChange("priceRange", value)}
        />
        <SortFilter
          value={filters.sortBy}
          onChange={(value) => handleFilterChange("sortBy", value)}
        />
      </div>

      <div className="flex justify-between items-center">
        <AdvancedFilters
          landType={filters.landType}
          registrationStatus={filters.registrationStatus}
          onLandTypeChange={(value) => handleFilterChange("landType", value)}
          onRegistrationStatusChange={(value) =>
            handleFilterChange("registrationStatus", value)
          }
        />
        <Button>
          <Search className="mr-2 h-4 w-4" />
          Ara
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;