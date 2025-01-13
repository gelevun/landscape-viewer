import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PriceRangeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const PriceRangeFilter = ({ value, onChange }: PriceRangeFilterProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Fiyat Aralığı</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Fiyat aralığı seçin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0-500000">0 - 500.000 ₺</SelectItem>
          <SelectItem value="500000-1000000">500.000 - 1.000.000 ₺</SelectItem>
          <SelectItem value="1000000-2000000">1.000.000 - 2.000.000 ₺</SelectItem>
          <SelectItem value="2000000-5000000">2.000.000 - 5.000.000 ₺</SelectItem>
          <SelectItem value="5000000-">5.000.000 ₺ ve üzeri</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PriceRangeFilter;