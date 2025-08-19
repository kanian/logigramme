import { Node, Edge } from '@xyflow/react';

export interface FlowNode extends Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    color?: string;
    description?: string;
  };
}

export interface FlowEdge extends Edge {
  id: string;
  source: string;
  target: string;
  sourceHandle: string | null;
  targetHandle: string | null;
  type?: string;
  animated?: boolean;
}

export interface FlowState {
  nodes: FlowNode[];
  edges: FlowEdge[];
  selectedNodeId: string | null;
  isConnecting: boolean;
}

export type NodeType = 'default' | 'input' | 'output' | 'decision' | 'process';
