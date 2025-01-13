import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchFilters = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Konum ara..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="İmar Durumu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="imarlı">İmarlı</SelectItem>
            <SelectItem value="imarsız">İmarsız</SelectItem>
            <SelectItem value="hisseli">Hisseli</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Fiyat Aralığı" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-500000">0 - 500.000 ₺</SelectItem>
            <SelectItem value="500000-1000000">500.000 - 1.000.000 ₺</SelectItem>
            <SelectItem value="1000000+">1.000.000+ ₺</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Alan (m²)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-1000">0 - 1.000 m²</SelectItem>
            <SelectItem value="1000-5000">1.000 - 5.000 m²</SelectItem>
            <SelectItem value="5000+">5.000+ m²</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Gelişmiş Filtreler
        </Button>
        <Button>
          <Search className="mr-2 h-4 w-4" />
          Ara
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;