import { Autocomplete } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  country: string;
}

export default function CityAutocomplete({
  value,
  onChange,
  placeholder,
  country,
}: CityAutocompleteProps) {
  return (
    <Autocomplete
      onLoad={(autocomplete) => {
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          onChange(place.formatted_address || "");
        });
      }}
      options={{ componentRestrictions: { country } }} // Limit to USA
      types={["(cities)"]}
    >
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Autocomplete>
  );
}
