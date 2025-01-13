import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AdvancedFiltersProps {
  landType: string;
  registrationStatus: string;
  onLandTypeChange: (value: string) => void;
  onRegistrationStatusChange: (value: string) => void;
}

const AdvancedFilters = ({
  landType,
  registrationStatus,
  onLandTypeChange,
  onRegistrationStatusChange,
}: AdvancedFiltersProps) => {
  return (
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
            <RadioGroup value={landType} onValueChange={onLandTypeChange}>
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
              value={registrationStatus}
              onValueChange={onRegistrationStatusChange}
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
  );
};

export default AdvancedFilters;