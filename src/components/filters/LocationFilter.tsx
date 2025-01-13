import { Input } from "@/components/ui/input";

interface LocationFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const LocationFilter = ({ value, onChange }: LocationFilterProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="location" className="text-sm font-medium">
        Konum
      </label>
      <Input
        id="location"
        type="text"
        placeholder="Şehir veya ilçe ara..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default LocationFilter;