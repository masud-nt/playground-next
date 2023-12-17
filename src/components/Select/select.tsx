import { cn } from "@/lib/utils";
import React from "react";
import CSelect, { Props, GroupBase } from "react-select";

const controlStyles = {
  base: "border rounded-md bg-transparent hover:cursor-pointer",
  focus: "border-input ring-1 ring-primary",
  nonFocus: "border-input hover:border-primary",
  error: "ring-1 ring-destructive",
};
const placeholderStyles = "text-muted-foreground pl-1 py-0.5";
const selectInputStyles = "pl-1";
const valueContainerStyles = "p-1 gap-1";
const singleValueStyles = "leading-7 ml-1";
const multiValueStyles =
  "bg-muted rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
const multiValueLabelStyles = "leading-6 py-0.5";
const multiValueRemoveStyles =
  "border border-muted bg-white hover:bg-red-50 hover:text-destructive text-muted-foreground hover:border-destructive rounded-md";
const indicatorsContainerStyles = "p-1 gap-1";
const clearIndicatorStyles =
  "text-muted-foreground p-1 rounded-md hover:bg-red-50 hover:text-destructive";
const indicatorSeparatorStyles = "bg-muted";
const dropdownIndicatorStyles =
  "p-1 hover:bg-muted text-muted-foreground rounded-md";
const menuStyles = "p-1 mt-2 border border-muted bg-popover rounded-md";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-muted-foreground text-sm";
const optionStyles = {
  base: "hover:cursor-pointer px-3 py-2 rounded",
  focus: "bg-muted active:bg-primary",
  selected: " after:ml-2 after:text-primary text-muted-foreground",
};
const noOptionsMessageStyles =
  "text-muted-foreground p-2 bg-muted border border-dashed border-muted rounded-sm";

export interface SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Props<Option, IsMulti, Group> {
  error?: any;
}

function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({ error, ...props }: SelectProps<Option, IsMulti, Group>) {
  return (
    <CSelect
      data-testid="select"
      unstyled
      classNames={{
        control: ({ isFocused }) =>
          cn(
            error
              ? controlStyles.error
              : isFocused
              ? controlStyles.focus
              : controlStyles.nonFocus,
            controlStyles.base
          ),
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        multiValueRemove: () => multiValueRemoveStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        clearIndicator: () => clearIndicatorStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        groupHeading: () => groupHeadingStyles,
        option: ({ isFocused, isSelected }) =>
          cn(
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base
          ),
        noOptionsMessage: () => noOptionsMessageStyles,
      }}
      {...props}
    />
  );
}

export { Select };
