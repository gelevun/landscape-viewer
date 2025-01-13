import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

interface LocationFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const LocationFilter = ({ value, onChange }: LocationFilterProps) => {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Konum ara..."
        className="pl-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
    </div>
  );
};

export default LocationFilter;