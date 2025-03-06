// types/PrimaryNavigation.ts

export interface SubItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  description?: string;
  isPro?: boolean;
  isNew?: boolean;
  highlight?: boolean;
  badge?: string;
}

export interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  subItems?: SubItem[];
  isNew?: boolean;
  badge?: string;
  gradient?: string;
}

export interface NavConfig {
  gradients: {
    hover: string;
    active: string;
  };
  animations: {
    scaleOnHover: string;
    fadeIn: string;
    slideIn: string;
  };
  badges: {
    pro: string;
    new: string;
    beta: string;
    trending: string;
  };
  glass: {
    background: string;
    border: string;
  };
}
export interface SubNavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  description?: string;
  isNew?: boolean;
  isPro?: boolean;
  badge?: string;
  highlight?: boolean;
}

export interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isNew?: boolean;
  gradient?: string;
  subItems?: SubNavItem[];
  badge?: string;
}
export interface MainTool {
  icon: React.ReactNode;
  label: string;
  href: string;
  bgGradient: string;
  description?: string;
  isNew?: boolean;
  isPro?: boolean;
}
