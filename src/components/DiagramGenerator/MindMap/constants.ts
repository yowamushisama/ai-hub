// constants.ts

import { NodeTypeOption } from "./MindMapModel";
import { NodeType } from "./MindMapModel";

export const DEFAULT_NODE_TYPES: NodeTypeOption[] = [
  {
    value: NodeType.ROOT,
    label: "Root",
    color: "var(--primary-600)",
    description: "Main central node",
  },
  {
    value: NodeType.PRIMARY,
    label: "Primary",
    color: "var(--primary-500)",
    description: "Main branch",
  },
  {
    value: NodeType.SECONDARY,
    label: "Secondary",
    color: "var(--secondary-500)",
    description: "Sub branch",
  },
  {
    value: NodeType.ACCENT,
    label: "Accent",
    color: "var(--accent-500)",
    description: "Highlighted node",
  },
  {
    value: NodeType.INFO,
    label: "Info",
    color: "var(--primary-200)",
    description: "Information node",
  },
  {
    value: NodeType.SUCCESS,
    label: "Success",
    color: "var(--success-500)",
    description: "Positive outcome",
  },
  {
    value: NodeType.WARNING,
    label: "Warning",
    color: "var(--warning-500)",
    description: "Caution or warning",
  },
  {
    value: NodeType.DANGER,
    label: "Danger",
    color: "var(--error-500)",
    description: "Risk or problem",
  },
];
