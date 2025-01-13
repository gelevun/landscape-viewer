import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertyTypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const PropertyTypeFilter = ({ value, onChange }: PropertyTypeFilterProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Arsa Tipi</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Arsa tipi seçin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="imarlı">İmarlı Arsa</SelectItem>
          <SelectItem value="imarsız">İmarsız Arsa</SelectItem>
          <SelectItem value="tarla">Tarla</SelectItem>
          <SelectItem value="bağ">Bağ</SelectItem>
          <SelectItem value="zeytinlik">Zeytinlik</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PropertyTypeFilter;