"use client"

import ReactSelect, { Props as SelectProps, StylesConfig, GroupBase } from "react-select"

type Option = { value: string | number; label: string }

interface AdminSelectProps extends Omit<SelectProps<Option, false, GroupBase<Option>>, "classNamePrefix"> {
  label?: string
  error?: string
}

const customStyles: StylesConfig<Option, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: "42px",
    borderRadius: "8px",
    borderColor: state.isFocused ? "hsl(var(--ring))" : "hsl(var(--input))",
    backgroundColor: "hsl(var(--background))",
    boxShadow: state.isFocused ? "0 0 0 2px hsl(var(--ring) / 0.2)" : "none",
    "&:hover": { borderColor: "hsl(var(--ring))" },
    fontSize: "0.875rem",
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "10px",
    border: "1px solid hsl(var(--border))",
    boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
    overflow: "hidden",
    zIndex: 50,
    backgroundColor: "hsl(var(--popover))",
  }),
  menuList: (base) => ({
    ...base,
    padding: "4px",
    maxHeight: "220px",
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: "6px",
    fontSize: "0.875rem",
    padding: "8px 12px",
    cursor: "pointer",
    backgroundColor: state.isSelected
      ? "hsl(var(--primary))"
      : state.isFocused
      ? "hsl(var(--accent) / 0.1)"
      : "transparent",
    color: state.isSelected ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
    "&:active": { backgroundColor: "hsl(var(--primary) / 0.9)" },
  }),
  singleValue: (base) => ({
    ...base,
    color: "hsl(var(--foreground))",
    fontSize: "0.875rem",
  }),
  placeholder: (base) => ({
    ...base,
    color: "hsl(var(--muted-foreground))",
    fontSize: "0.875rem",
  }),
  input: (base) => ({
    ...base,
    color: "hsl(var(--foreground))",
    fontSize: "0.875rem",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
    padding: "0 8px",
    transition: "transform 0.2s, color 0.2s",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "hsl(var(--muted-foreground))",
    padding: "0 4px",
    "&:hover": { color: "hsl(var(--destructive))" },
  }),
  noOptionsMessage: (base) => ({
    ...base,
    fontSize: "0.875rem",
    color: "hsl(var(--muted-foreground))",
  }),
  loadingMessage: (base) => ({
    ...base,
    fontSize: "0.875rem",
    color: "hsl(var(--muted-foreground))",
  }),
}

export function AdminSelect({ label, error, ...props }: AdminSelectProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <ReactSelect
        styles={customStyles}
        noOptionsMessage={() => "Aucune option disponible"}
        loadingMessage={() => "Chargement..."}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
