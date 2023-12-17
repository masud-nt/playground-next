import React, { useEffect, useState } from "react";
import { FunnelIcon } from "@heroicons/react/20/solid";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Select } from "../Select";

interface Option {
  id: string;
  label: string;
  value: string;
  selected: boolean;
}

interface Filter {
  id: string;
  label: string;
  type: "single" | "multiple";
  selected: string | string[];
  options: Option[];
}

interface FilterComponentProps {
  filters: Filter[];
  appliedFilters: any;
  onApply: (filters: any) => void;
  onReset: () => void;
}

export default function Filters({
  filters,
  appliedFilters,
  onApply,
  onReset,
}: FilterComponentProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>(filters);

  useEffect(() => {
    const updatedFilters = filters.map((filter) => {
      const appliedFilter = appliedFilters.find((f: any) => f.id === filter.id);
      if (appliedFilter) {
        return {
          ...filter,
          selected: appliedFilter.selected,
          options: filter.options.map((option) => ({
            ...option,
            selected: Array.isArray(appliedFilter.selected)
              ? appliedFilter.selected.includes(option.value)
              : appliedFilter.selected === option.value,
          })),
        };
      }
      return filter;
    });

    setSelectedFilters(updatedFilters);
  }, [appliedFilters, filters]);

  const handleApply = () => {
    const formattedFilters = selectedFilters.map((filter) => ({
      id: filter.id,
      selected:
        filter.type === "multiple"
          ? filter.options.filter((opt) => opt.selected).map((opt) => opt.value)
          : filter.options.find((opt) => opt.selected)?.value || "",
    }));

    onApply(formattedFilters);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    // Reset to initial state if needed
  };

  const handleReset = () => {
    onReset();
    setIsOpen(false);
  };

  const handleSelectionChange = (
    filterId: string,
    value: string | string[],
    isMultiple: boolean
  ) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.map((filter) => {
        if (filter.id !== filterId) {
          return filter;
        }

        if (isMultiple) {
          const newSelected = typeof value === "string" ? [value] : value;
          return {
            ...filter,
            options: filter.options.map((option) => ({
              ...option,
              selected: newSelected.includes(option.value),
            })),
          };
        }

        // For single selection
        return {
          ...filter,
          options: filter.options.map((option) => ({
            ...option,
            selected: option.value === value,
          })),
        };
      })
    );
  };

  const renderFilterInput = (filter: Filter) => {
    return (
      <>
        {filter.type === "multiple" ? (
          <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
            {filter.options.map((option, optionIdx) => (
              <div
                key={option.id}
                className="flex items-center text-base sm:text-sm"
              >
                <Checkbox
                  id={`filter-${filter.id}-${optionIdx}`}
                  name={filter.id}
                  defaultValue={option.value}
                  checked={option.selected}
                  onCheckedChange={(checked) =>
                    handleSelectionChange(filter.id, option.value, true)
                  }
                  className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Label
                  htmlFor={`filter-${filter.id}-${optionIdx}`}
                  className="ml-3 min-w-0 flex-1 text-gray-600"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
            <Select
              value={filter.options.find((opt) => opt.selected)?.value || ""}
              onChange={(e) => handleSelectionChange(filter.id, e, false)}
              options={filter.options.map((opt) => ({
                label: opt.label,
                value: opt.value,
              }))}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="grid items-center border-b border-t border-gray-200"
      >
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>
        <div className="relative col-start-1 row-start-1 py-4">
          <div className="flex space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
            <div>
              <CollapsibleTrigger className="group flex items-center font-medium text-gray-700">
                <FunnelIcon
                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                2 Filters
              </CollapsibleTrigger>
            </div>
            <div className="pl-6">
              <button type="button" className="text-gray-500">
                Clear all
              </button>
            </div>
          </div>
        </div>
        <CollapsibleContent className="border-t border-gray-200 py-10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-4 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
            {filters.map((filter) => (
              <div key={filter.id}>
                <legend className="block font-medium">{filter.label}</legend>
                {renderFilterInput(filter)}
              </div>
            ))}
          </div>
          <div className="mx-auto max-w-7xl flex space-x-4 px-4 text-sm sm:px-6 md:space-x-6 lg:px-8 items-center justify-end">
            <Button>Apply</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
