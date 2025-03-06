// utils/helpers.ts

/**
 * Generate a unique ID for nodes and edges
 */
export const generateUniqueId = (): string => {
  return `id-${Math.random().toString(36).substring(2, 9)}-${Date.now().toString(36)}`;
};

/**
 * Format timestamp to a readable date string
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Download JSON data as a file
 */
export const downloadJson = (data: any, filename: string = 'mindmap.json'): void => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Parse JSON from file
 */
export const parseJsonFile = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        resolve(json);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Validate a MindMap JSON structure
 */
export const isValidMindMapJson = (json: any): boolean => {
  // Basic structure validation
  if (!json || typeof json !== 'object') return false;
  if (!Array.isArray(json.nodes) || !Array.isArray(json.edges)) return false;
  
  // Validate nodes
  const hasValidNodes = json.nodes.every((node: any) => {
    return (
      node &&
      typeof node === 'object' &&
      typeof node.id === 'string' &&
      typeof node.position === 'object' &&
      typeof node.position.x === 'number' &&
      typeof node.position.y === 'number' &&
      typeof node.data === 'object' &&
      typeof node.data.label === 'string'
    );
  });
  
  // Validate edges
  const hasValidEdges = json.edges.every((edge: any) => {
    return (
      edge &&
      typeof edge === 'object' &&
      typeof edge.id === 'string' &&
      typeof edge.source === 'string' &&
      typeof edge.target === 'string'
    );
  });
  
  return hasValidNodes && hasValidEdges;
};

/**
 * Center nodes in the viewport
 */
export const calculateNodesBoundingBox = (nodes: any[]): {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
} => {
  if (nodes.length === 0) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 };
  }

  const nodePositions = nodes.map((node) => ({
    x: node.position.x,
    y: node.position.y,
    width: node.width || 150, // Default width if not available
    height: node.height || 50, // Default height if not available
  }));

  const minX = Math.min(...nodePositions.map((pos) => pos.x));
  const minY = Math.min(...nodePositions.map((pos) => pos.y));
  const maxX = Math.max(...nodePositions.map((pos) => pos.x + pos.width));
  const maxY = Math.max(...nodePositions.map((pos) => pos.y + pos.height));

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
};