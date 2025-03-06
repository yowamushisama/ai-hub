export interface DropdownItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  dropdownItems?: DropdownItem[];
}
