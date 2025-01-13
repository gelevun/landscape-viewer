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
    <div className="space-y-2">
      <label className="text-sm font-medium">Sıralama</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sıralama seçin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">En Yeni</SelectItem>
          <SelectItem value="price-asc">Fiyat (Düşükten Yükseğe)</SelectItem>
          <SelectItem value="price-desc">Fiyat (Yüksekten Düşüğe)</SelectItem>
          <SelectItem value="area-desc">Alan (Büyükten Küçüğe)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortFilter;