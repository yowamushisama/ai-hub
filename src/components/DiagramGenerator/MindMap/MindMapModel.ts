// types.ts

import { LucideIcon } from "lucide-react";
import { NodeType } from "..";

export interface NodeTypeOption {
  value: string;
  label: string;
  color: string;
  description?: string;
  icon?: LucideIcon;
}
export { NodeType };
