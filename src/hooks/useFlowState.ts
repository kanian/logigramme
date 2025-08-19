import { create } from 'zustand';
import { FlowNode, FlowEdge } from '../types/flow';
import { saveFlowchart, loadFlowchart } from '../utils/storage';

interface FlowStore {
  nodes: FlowNode[];
  edges: FlowEdge[];
  selectedNodeId: string | null;

  // Actions
  setNodes: (nodes: FlowNode[] | ((nodes: FlowNode[]) => FlowNode[])) => void;
  setEdges: (edges: FlowEdge[] | ((edges: FlowEdge[]) => FlowEdge[])) => void;
  addNode: (node: FlowNode) => void;
  deleteNode: (nodeId: string) => void;
  updateNode: (nodeId: string, data: Partial<FlowNode['data']>) => void;
  setSelectedNode: (nodeId: string | null) => void;

  // Persistence
  saveFlow: () => void;
  loadFlow: () => void;
  resetFlow: () => void;
}

const initialNodes: FlowNode[] = [
  {
    id: '1',
    type: 'input',
    position: { x: 300, y: 50 },
    data: { label: 'Start', color: '#10b981' },
  },
];

const initialEdges: FlowEdge[] = [];

export const useFlowStore = create<FlowStore>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNodeId: null,

  setNodes: (nodes) =>
    set({ nodes: typeof nodes === 'function' ? nodes(get().nodes) : nodes }),
  setEdges: (edges) =>
    set({ edges: typeof edges === 'function' ? edges(get().edges) : edges }),

  addNode: (node) => {
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
    get().saveFlow();
  },

  deleteNode: (nodeId) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
      selectedNodeId:
        state.selectedNodeId === nodeId ? null : state.selectedNodeId,
    }));
    get().saveFlow();
  },

  updateNode: (nodeId, data) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
    }));
    get().saveFlow();
  },

  setSelectedNode: (nodeId) => set({ selectedNodeId: nodeId }),

  saveFlow: () => {
    const { nodes, edges } = get();
    saveFlowchart(nodes, edges);
  },

  loadFlow: () => {
    const data = loadFlowchart();
    if (data) {
      set({
        nodes: data.nodes,
        edges: data.edges,
      });
    }
  },

  resetFlow: () => {
    set({
      nodes: initialNodes,
      edges: initialEdges,
      selectedNodeId: null,
    });
  },
}));
