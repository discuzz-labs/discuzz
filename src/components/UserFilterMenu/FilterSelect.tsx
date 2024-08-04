import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { PostStatus, Prisma } from "@prisma/client";

interface FilterOption {
  label: string;
  value: string;
}

export const statusOptions: FilterOption[] = Object.values(PostStatus).map(
  (status) => ({
    label: status,
    value: status,
  })
);

export const filterOptions: FilterOption[] = Object.values(
  Prisma.PostScalarFieldEnum
).map((filter) => ({
  label: filter,
  value: filter,
}));

export const orderOptions: FilterOption[] = Object.values(Prisma.SortOrder).map(
  (order) => ({
    label: order,
    value: order,
  })
);

const FilterSelect: React.FC<{
  options: FilterOption[];
  onChange: (value: string) => void;
  label: string;
}> = ({ options, onChange, label }) => (
  <Select onValueChange={onChange}>
    <SelectTrigger className="h-7 gap-1 text-sm w-[100px]">
      <span className="sr-only sm:not-sr-only">{label}</span>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{label}</SelectLabel>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default FilterSelect