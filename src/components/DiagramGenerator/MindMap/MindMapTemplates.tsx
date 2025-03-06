import React from "react";
import { Node, Edge } from "reactflow";
import {
  Lightbulb,
  Briefcase,
  Book,
  Film,
  UserCircle,
  Rocket,
  Target,
  Presentation,
  BarChart,
  CircleSlash,
  LucideIcon,
} from "lucide-react";
import { NodeData, NodeType } from "..";
import { EdgeData } from "..";
import { generateUniqueId } from "./utlis/helpers";

export interface MindMapTemplate {
  key: string;
  name: string;
  description: string;
  icon: LucideIcon;
  nodes: Node<NodeData>[];
  edges: Edge<EdgeData>[];
}

// Create an empty mindmap
export const createEmptyMindMap = (): {
  nodes: Node<NodeData>[];
  edges: Edge<EdgeData>[];
} => {
  return {
    nodes: [],
    edges: [],
  };
};

// Helper function to create a basic mindmap with a central topic
export const createBasicMindMap = (
  centralTopic: string
): { nodes: Node<NodeData>[]; edges: Edge<EdgeData>[] } => {
  const rootNode: Node<NodeData> = {
    id: "root",
    type: "mindmap",
    data: {
      label: centralTopic,
      type: NodeType.ROOT,
      isRoot: true,
      level: 0,
      childCount: 0,
      expanded: true,
    },
    position: { x: 0, y: 0 },
  };

  return {
    nodes: [rootNode],
    edges: [],
  };
};

// Business Plan Template
const createBusinessPlanTemplate = (): {
  nodes: Node<NodeData>[];
  edges: Edge<EdgeData>[];
} => {
  const { nodes, edges } = createBasicMindMap("Business Plan");

  // Primary nodes
  const primaryNodes = [
    {
      id: generateUniqueId(),
      label: "Executive Summary",
      type: NodeType.PRIMARY,
    },
    {
      id: generateUniqueId(),
      label: "Company Description",
      type: NodeType.PRIMARY,
    },
    {
      id: generateUniqueId(),
      label: "Market Analysis",
      type: NodeType.PRIMARY,
    },
    {
      id: generateUniqueId(),
      label: "Products & Services",
      type: NodeType.PRIMARY,
    },
    {
      id: generateUniqueId(),
      label: "Financial Projections",
      type: NodeType.PRIMARY,
    },
  ];

  // Add nodes and connect to root
  primaryNodes.forEach((node) => {
    nodes.push({
      id: node.id,
      type: "mindmap",
      data: {
        label: node.label,
        type: node.type,
        level: 1,
        childCount: 0,
        expanded: true,
      },
      position: { x: 0, y: 0 },
    });

    edges.push({
      id: `e-root-${node.id}`,
      source: "root",
      target: node.id,
      type: "mindmap",
      data: {
        animated: false,
      },
    });
  });

  // Update root node child count
  nodes[0].data.childCount = primaryNodes.length;

  // Secondary nodes for Market Analysis
  const marketAnalysisId = primaryNodes[2].id;
  const marketAnalysisNodes = [
    {
      id: generateUniqueId(),
      label: "Target Market",
      type: NodeType.SECONDARY,
    },
    { id: generateUniqueId(), label: "Competitors", type: NodeType.SECONDARY },
    { id: generateUniqueId(), label: "Market Size", type: NodeType.SECONDARY },
  ];

  marketAnalysisNodes.forEach((node) => {
    nodes.push({
      id: node.id,
      type: "mindmap",
      data: {
        label: node.label,
        type: node.type,
        level: 2,
        childCount: 0,
        expanded: true,
      },
      position: { x: 0, y: 0 },
    });

    edges.push({
      id: `e-${marketAnalysisId}-${node.id}`,
      source: marketAnalysisId,
      target: node.id,
      type: "mindmap",
      data: {
        color: "secondary",
      },
    });
  });

  // Update Market Analysis child count
  const marketAnalysisIndex = nodes.findIndex((n) => n.id === marketAnalysisId);
  if (marketAnalysisIndex !== -1) {
    nodes[marketAnalysisIndex].data.childCount = marketAnalysisNodes.length;
  }

  return { nodes, edges };
};

// SWOT Analysis Template
const createSwotAnalysisTemplate = (): {
  nodes: Node<NodeData>[];
  edges: Edge<EdgeData>[];
} => {
  const { nodes, edges } = createBasicMindMap("SWOT Analysis");

  // Primary nodes (SWOT categories)
  const swotNodes = [
    { id: generateUniqueId(), label: "Strengths", type: NodeType.PRIMARY },
    { id: generateUniqueId(), label: "Weaknesses", type: NodeType.PRIMARY },
    { id: generateUniqueId(), label: "Opportunities", type: NodeType.PRIMARY },
    { id: generateUniqueId(), label: "Threats", type: NodeType.PRIMARY },
  ];

  // Add nodes and connect to root
  swotNodes.forEach((node, index) => {
    nodes.push({
      id: node.id,
      type: "mindmap",
      data: {
        label: node.label,
        type: node.type,
        level: 1,
        childCount: 0,
        expanded: true,
      },
      position: { x: 0, y: 0 },
    });

    edges.push({
      id: `e-root-${node.id}`,
      source: "root",
      target: node.id,
      type: "mindmap",
      data: {},
    });
  });

  // Update root node child count
  nodes[0].data.childCount = swotNodes.length;

  // Add example items for each SWOT category
  const strengthsId = swotNodes[0].id;
  const weaknessesId = swotNodes[1].id;
  const opportunitiesId = swotNodes[2].id;
  const threatsId = swotNodes[3].id;

  // Strengths examples
  const strengthsNodes = [
    {
      id: generateUniqueId(),
      label: "Strong Brand Identity",
      type: NodeType.SECONDARY,
    },
    { id: generateUniqueId(), label: "Skilled Team", type: NodeType.SECONDARY },
  ];

  // Weaknesses examples
  const weaknessesNodes = [
    {
      id: generateUniqueId(),
      label: "Limited Resources",
      type: NodeType.SECONDARY,
    },
    {
      id: generateUniqueId(),
      label: "Weak Online Presence",
      type: NodeType.SECONDARY,
    },
  ];

  // Opportunities examples
  const opportunitiesNodes = [
    {
      id: generateUniqueId(),
      label: "New Market Segments",
      type: NodeType.SECONDARY,
    },
    {
      id: generateUniqueId(),
      label: "Technology Advances",
      type: NodeType.SECONDARY,
    },
  ];

  // Threats examples
  const threatsNodes = [
    {
      id: generateUniqueId(),
      label: "Increasing Competition",
      type: NodeType.SECONDARY,
    },
    {
      id: generateUniqueId(),
      label: "Economic Downturns",
      type: NodeType.SECONDARY,
    },
  ];

  // Add all example nodes and their connections
  const addExampleNodes = (
    parentId: string,
    exampleNodes: { id: string; label: string; type: NodeType }[]
  ) => {
    exampleNodes.forEach((node) => {
      nodes.push({
        id: node.id,
        type: "mindmap",
        data: {
          label: node.label,
          type: node.type,
          level: 2,
          childCount: 0,
          expanded: true,
        },
        position: { x: 0, y: 0 },
      });

      edges.push({
        id: `e-${parentId}-${node.id}`,
        source: parentId,
        target: node.id,
        type: "mindmap",
        data: {
          color: "secondary",
        },
      });
    });

    // Update parent node child count
    const parentIndex = nodes.findIndex((n) => n.id === parentId);
    if (parentIndex !== -1) {
      nodes[parentIndex].data.childCount = exampleNodes.length;
    }
  };

  addExampleNodes(strengthsId, strengthsNodes);
  addExampleNodes(weaknessesId, weaknessesNodes);
  addExampleNodes(opportunitiesId, opportunitiesNodes);
  addExampleNodes(threatsId, threatsNodes);

  return { nodes, edges };
};

// Brainstorming Template
const createBrainstormingTemplate = (): {
  nodes: Node<NodeData>[];
  edges: Edge<EdgeData>[];
} => {
  const { nodes, edges } = createBasicMindMap("Brainstorming");

  // Primary categories
  const categories = [
    { id: generateUniqueId(), label: "Ideas", type: NodeType.PRIMARY },
    { id: generateUniqueId(), label: "Questions", type: NodeType.PRIMARY },
    { id: generateUniqueId(), label: "Resources", type: NodeType.PRIMARY },
    { id: generateUniqueId(), label: "Actions", type: NodeType.PRIMARY },
  ];

  // Add nodes and connect to root
  categories.forEach((node) => {
    nodes.push({
      id: node.id,
      type: "mindmap",
      data: {
        label: node.label,
        type: node.type,
        level: 1,
        childCount: 0,
        expanded: true,
      },
      position: { x: 0, y: 0 },
    });

    edges.push({
      id: `e-root-${node.id}`,
      source: "root",
      target: node.id,
      type: "mindmap",
      data: {},
    });
  });

  // Update root node child count
  nodes[0].data.childCount = categories.length;

  return { nodes, edges };
};

// Project Planning Template
const createProjectPlanningTemplate = (): {
  nodes: Node<NodeData>[];
  edges: Edge<EdgeData>[];
} => {
  const { nodes, edges } = createBasicMindMap("Project Plan");

  // Main project phases
  const phases = [
    { id: generateUniqueId(), label: "Initiation", type: NodeType.PRIMARY },
    { id: generateUniqueId(), label: "Planning", type: NodeType.PRIMARY },
    { id: generateUniqueId(), label: "Execution", type: NodeType.PRIMARY },
    { id: generateUniqueId(), label: "Monitoring", type: NodeType.PRIMARY },
    { id: generateUniqueId(), label: "Closure", type: NodeType.PRIMARY },
  ];

  // Add nodes and connect to root
  phases.forEach((node) => {
    nodes.push({
      id: node.id,
      type: "mindmap",
      data: {
        label: node.label,
        type: node.type,
        level: 1,
        childCount: 0,
        expanded: true,
      },
      position: { x: 0, y: 0 },
    });

    edges.push({
      id: `e-root-${node.id}`,
      source: "root",
      target: node.id,
      type: "mindmap",
      data: {},
    });
  });

  // Update root node child count
  nodes[0].data.childCount = phases.length;

  // Tasks for Planning phase
  const planningId = phases[1].id;
  const planningTasks = [
    { id: generateUniqueId(), label: "Define Scope", type: NodeType.SECONDARY },
    {
      id: generateUniqueId(),
      label: "Create Schedule",
      type: NodeType.SECONDARY,
    },
    {
      id: generateUniqueId(),
      label: "Budget Planning",
      type: NodeType.SECONDARY,
    },
    {
      id: generateUniqueId(),
      label: "Risk Assessment",
      type: NodeType.SECONDARY,
    },
  ];

  planningTasks.forEach((task) => {
    nodes.push({
      id: task.id,
      type: "mindmap",
      data: {
        label: task.label,
        type: task.type,
        level: 2,
        childCount: 0,
        expanded: true,
      },
      position: { x: 0, y: 0 },
    });

    edges.push({
      id: `e-${planningId}-${task.id}`,
      source: planningId,
      target: task.id,
      type: "mindmap",
      data: {
        color: "secondary",
      },
    });
  });

  // Update Planning phase child count
  const planningIndex = nodes.findIndex((n) => n.id === planningId);
  if (planningIndex !== -1) {
    nodes[planningIndex].data.childCount = planningTasks.length;
  }

  // Tasks for Execution phase
  const executionId = phases[2].id;
  const executionTasks = [
    {
      id: generateUniqueId(),
      label: "Assign Resources",
      type: NodeType.SECONDARY,
    },
    {
      id: generateUniqueId(),
      label: "Execute Tasks",
      type: NodeType.SECONDARY,
    },
    {
      id: generateUniqueId(),
      label: "Quality Control",
      type: NodeType.SECONDARY,
    },
  ];

  executionTasks.forEach((task) => {
    nodes.push({
      id: task.id,
      type: "mindmap",
      data: {
        label: task.label,
        type: task.type,
        level: 2,
        childCount: 0,
        expanded: true,
      },
      position: { x: 0, y: 0 },
    });

    edges.push({
      id: `e-${executionId}-${task.id}`,
      source: executionId,
      target: task.id,
      type: "mindmap",
      data: {
        color: "secondary",
      },
    });
  });

  // Update Execution phase child count
  const executionIndex = nodes.findIndex((n) => n.id === executionId);
  if (executionIndex !== -1) {
    nodes[executionIndex].data.childCount = executionTasks.length;
  }

  return { nodes, edges };
};

// Learning Map Template
const createLearningMapTemplate = (): {
  nodes: Node<NodeData>[];
  edges: Edge<EdgeData>[];
} => {
  const { nodes, edges } = createBasicMindMap("Learning Plan");

  // Main topic areas
  const topics = [
    { id: generateUniqueId(), label: "Core Concepts", type: NodeType.PRIMARY },
    {
      id: generateUniqueId(),
      label: "Skills to Develop",
      type: NodeType.PRIMARY,
    },
    { id: generateUniqueId(), label: "Resources", type: NodeType.PRIMARY },
    { id: generateUniqueId(), label: "Practice Areas", type: NodeType.PRIMARY },
  ];

  // Add nodes and connect to root
  topics.forEach((node) => {
    nodes.push({
      id: node.id,
      type: "mindmap",
      data: {
        label: node.label,
        type: node.type,
        level: 1,
        childCount: 0,
        expanded: true,
      },
      position: { x: 0, y: 0 },
    });

    edges.push({
      id: `e-root-${node.id}`,
      source: "root",
      target: node.id,
      type: "mindmap",
      data: {},
    });
  });

  // Update root node child count
  nodes[0].data.childCount = topics.length;

  // Example skills
  const skillsId = topics[1].id;
  const skills = [
    {
      id: generateUniqueId(),
      label: "Technical Skills",
      type: NodeType.SECONDARY,
    },
    { id: generateUniqueId(), label: "Soft Skills", type: NodeType.SECONDARY },
    {
      id: generateUniqueId(),
      label: "Subject Expertise",
      type: NodeType.SECONDARY,
    },
  ];

  skills.forEach((skill) => {
    nodes.push({
      id: skill.id,
      type: "mindmap",
      data: {
        label: skill.label,
        type: skill.type,
        level: 2,
        childCount: 0,
        expanded: true,
      },
      position: { x: 0, y: 0 },
    });

    edges.push({
      id: `e-${skillsId}-${skill.id}`,
      source: skillsId,
      target: skill.id,
      type: "mindmap",
      data: {
        color: "secondary",
      },
    });
  });

  // Update Skills child count
  const skillsIndex = nodes.findIndex((n) => n.id === skillsId);
  if (skillsIndex !== -1) {
    nodes[skillsIndex].data.childCount = skills.length;
  }

  // Example technical skills
  const technicalSkillsId = skills[0].id;
  const technicalSkills = [
    { id: generateUniqueId(), label: "Programming", type: NodeType.INFO },
    { id: generateUniqueId(), label: "Data Analysis", type: NodeType.INFO },
  ];

  technicalSkills.forEach((skill) => {
    nodes.push({
      id: skill.id,
      type: "mindmap",
      data: {
        label: skill.label,
        type: skill.type,
        level: 3,
        childCount: 0,
        expanded: true,
      },
      position: { x: 0, y: 0 },
    });

    edges.push({
      id: `e-${technicalSkillsId}-${skill.id}`,
      source: technicalSkillsId,
      target: skill.id,
      type: "mindmap",
      data: {
        color: "accent",
        style: "dotted",
      },
    });
  });

  // Update Technical Skills child count
  const technicalSkillsIndex = nodes.findIndex(
    (n) => n.id === technicalSkillsId
  );
  if (technicalSkillsIndex !== -1) {
    nodes[technicalSkillsIndex].data.childCount = technicalSkills.length;
  }

  return { nodes, edges };
};

// List of all templates
export const TEMPLATES: MindMapTemplate[] = [
  {
    key: "empty",
    name: "Empty",
    description: "Start from scratch",
    icon: CircleSlash,
    ...createEmptyMindMap(),
  },
  {
    key: "basic",
    name: "Basic",
    description: "Simple mind map with a central topic",
    icon: Lightbulb,
    ...createBasicMindMap("Central Topic"),
  },
  {
    key: "business-plan",
    name: "Business Plan",
    description: "Outline your business strategy",
    icon: Briefcase,
    ...createBusinessPlanTemplate(),
  },
  {
    key: "swot",
    name: "SWOT Analysis",
    description: "Analyze strengths, weaknesses, opportunities, and threats",
    icon: Target,
    ...createSwotAnalysisTemplate(),
  },
  {
    key: "brainstorming",
    name: "Brainstorming",
    description: "Capture and organize ideas",
    icon: Lightbulb,
    ...createBrainstormingTemplate(),
  },
  {
    key: "project-planning",
    name: "Project Plan",
    description: "Organize project phases and tasks",
    icon: Rocket,
    ...createProjectPlanningTemplate(),
  },
  {
    key: "learning-map",
    name: "Learning Map",
    description: "Plan your learning journey",
    icon: Book,
    ...createLearningMapTemplate(),
  },
];

// Function to get a template by key
export const getTemplateByKey = (key: string): MindMapTemplate | undefined => {
  return TEMPLATES.find((template) => template.key === key);
};
