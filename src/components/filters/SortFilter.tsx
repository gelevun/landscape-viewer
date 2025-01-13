import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const SortFilter = ({ value, onChange }: SortFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
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
  );
};

export default SortFilter;