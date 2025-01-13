import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, MapPin, Building2, ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export interface FilterState {
  location: string;
  propertyType: string;
  priceRange: string;
  sortBy: string;
  landType: string;
  registrationStatus: string;
}

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
    registrationStatus: "all-status"
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Konum ara..."
            className="pl-10"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          />
          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>

        <Select 
          value={filters.propertyType} 
          onValueChange={(value) => handleFilterChange('propertyType', value)}
        >
          <SelectTrigger>
            <Building2 className="mr-2 h-4 w-4" />
            <SelectValue placeholder="İmar Durumu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="imarlı">İmarlı</SelectItem>
            <SelectItem value="imarsız">İmarsız</SelectItem>
            <SelectItem value="hisseli">Hisseli</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={filters.priceRange} 
          onValueChange={(value) => handleFilterChange('priceRange', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Fiyat Aralığı" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-500000">0 - 500.000 ₺</SelectItem>
            <SelectItem value="500000-1000000">500.000 - 1.000.000 ₺</SelectItem>
            <SelectItem value="1000000-2000000">1.000.000 - 2.000.000 ₺</SelectItem>
            <SelectItem value="2000000+">2.000.000+ ₺</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={filters.sortBy} 
          onValueChange={(value) => handleFilterChange('sortBy', value)}
        >
          <SelectTrigger>
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sıralama" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">En Yeni</SelectItem>
            <SelectItem value="price-asc">Fiyat (Düşükten Yükseğe)</SelectItem>
            <SelectItem value="price-desc">Fiyat (Yüksekten Düşüğe)</SelectItem>
            <SelectItem value="area-desc">Alan (Büyükten Küçüğe)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Gelişmiş Filtreler
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Arsa Tipi</h4>
                <RadioGroup 
                  value={filters.landType}
                  onValueChange={(value) => handleFilterChange('landType', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">Tümü</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="residential" id="residential" />
                    <Label htmlFor="residential">Konut İmarlı</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="commercial" id="commercial" />
                    <Label htmlFor="commercial">Ticari İmarlı</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Ada/Parsel Durumu</h4>
                <RadioGroup 
                  value={filters.registrationStatus}
                  onValueChange={(value) => handleFilterChange('registrationStatus', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all-status" id="all-status" />
                    <Label htmlFor="all-status">Tümü</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="registered" id="registered" />
                    <Label htmlFor="registered">Tapulu</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="shared" id="shared" />
                    <Label htmlFor="shared">Hisseli</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button>
          <Search className="mr-2 h-4 w-4" />
          Ara
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;