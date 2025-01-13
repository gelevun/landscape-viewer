import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="advanced-filters">
        <AccordionTrigger>Gelişmiş Filtreler</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium">Arazi Tipi</h4>
              <RadioGroup value={landType} onValueChange={onLandTypeChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all-types" />
                  <Label htmlFor="all-types">Tümü</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="flat" id="flat" />
                  <Label htmlFor="flat">Düz</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sloped" id="sloped" />
                  <Label htmlFor="sloped">Eğimli</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Tapu Durumu</h4>
              <RadioGroup
                value={registrationStatus}
                onValueChange={onRegistrationStatusChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all-status" id="all-status" />
                  <Label htmlFor="all-status">Tümü</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ready" id="ready" />
                  <Label htmlFor="ready">Hazır</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pending" id="pending" />
                  <Label htmlFor="pending">Beklemede</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AdvancedFilters;