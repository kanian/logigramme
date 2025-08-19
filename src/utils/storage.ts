import { FlowNode, FlowEdge } from '../types/flow';

const STORAGE_KEY = 'flowchart-data';

export interface FlowchartData {
  nodes: FlowNode[];
  edges: FlowEdge[];
  timestamp: number;
}

export const saveFlowchart = (nodes: FlowNode[], edges: FlowEdge[]): void => {
  try {
    const data: FlowchartData = {
      nodes,
      edges,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save flowchart:', error);
  }
};

export const loadFlowchart = (): FlowchartData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load flowchart:', error);
    return null;
  }
};

export const exportFlowchartAsJSON = (
  nodes: FlowNode[],
  edges: FlowEdge[]
): string => {
  const data: FlowchartData = {
    nodes,
    edges,
    timestamp: Date.now(),
  };
  return JSON.stringify(data, null, 2);
};

export const downloadJSON = (
  jsonString: string,
  filename: string = 'flowchart.json'
): void => {
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
