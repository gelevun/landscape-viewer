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
    <Select value={value} onValueChange={onChange}>
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
  );
};

export default PriceRangeFilter;