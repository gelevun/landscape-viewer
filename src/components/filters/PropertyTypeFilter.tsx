import { Building2 } from "lucide-react";
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
    <Select value={value} onValueChange={onChange}>
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
  );
};

export default PropertyTypeFilter;