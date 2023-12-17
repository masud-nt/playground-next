export interface Filter {
  id: string
  label: string
  type: "single" | "multiple" | "readOnly"
  selected?: string | string[]
  options: FilterOption[]
}

export interface FilterOption {
  id: string | number
  label: string
  value: string
  selected: boolean
}
