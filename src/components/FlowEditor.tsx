import React, { useCallback, useRef, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  ReactFlowProvider,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
} from '@xyflow/react';
import { toPng } from 'html-to-image';

import { useFlowStore } from '../hooks/useFlowState';
import { FlowNode } from '../types/flow';
import Toolbar from './Toolbar';
import Sidebar from './Sidebar';
import ContextMenu from './ContextMenu';
import { EditNodeDialog } from './EditNodeDialog';
import TextNode from './nodes/TextNode';
import DecisionNode from './nodes/DecisionNode';
import ProcessNode from './nodes/ProcessNode';

const FlowEditor: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodes, edges, setNodes, setEdges, addNode } = useFlowStore();
  const { screenToFlowPosition } = useReactFlow();

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    flowPosition: { x: number; y: number };
    type: 'canvas' | 'node';
    nodeId?: string;
  } | null>(null);

  // Edit dialog state
  const [editDialog, setEditDialog] = useState<{
    isOpen: boolean;
    nodeId: string;
    currentLabel: string;
    position: { x: number; y: number };
  } | null>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes(applyNodeChanges(changes, nodes) as any);
    },
    [nodes, setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges(applyEdgeChanges(changes, edges) as any);
    },
    [edges, setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      const edge = {
        ...params,
        id: `edge_${Date.now()}`,
        sourceHandle: params.sourceHandle || null,
        targetHandle: params.targetHandle || null,
      };
      setEdges((eds: any) => addEdge(edge, eds) as any);
    },
    [setEdges]
  );

  const onNodeDoubleClick = useCallback(
    (event: React.MouseEvent, node: any) => {
      setEditDialog({
        isOpen: true,
        nodeId: node.id,
        currentLabel: node.data.label,
        position: { x: event.clientX, y: event.clientY },
      });
    },
    []
  );

  // Handle double-click on the canvas to show context menu
  const onPaneClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      const rect = reactFlowWrapper.current?.getBoundingClientRect();
      if (rect) {
        const flowPosition = screenToFlowPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });

        setContextMenu({
          x: event.clientX,
          y: event.clientY,
          flowPosition,
          type: 'canvas',
        });
      }
    },
    [screenToFlowPosition]
  );

  // Handle node context menu
  const handleNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: any) => {
      event.preventDefault();
      event.stopPropagation();

      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        flowPosition: { x: 0, y: 0 }, // Not needed for node context menu
        type: 'node',
        nodeId: node.id,
      });
    },
    []
  );

  // Handle edit node
  const handleEditNode = useCallback(() => {
    if (contextMenu?.nodeId) {
      const node = nodes.find((n) => n.id === contextMenu.nodeId);
      if (node) {
        setEditDialog({
          isOpen: true,
          nodeId: contextMenu.nodeId,
          currentLabel: node.data.label,
          position: { x: contextMenu.x, y: contextMenu.y },
        });
        setContextMenu(null); // Close context menu
      }
    }
  }, [contextMenu, nodes]);

  // Handle save edited node
  const handleSaveEditedNode = useCallback(
    (newLabel: string) => {
      if (editDialog?.nodeId) {
        setNodes((nds: any) =>
          nds.map((n: any) =>
            n.id === editDialog.nodeId
              ? { ...n, data: { ...n.data, label: newLabel } }
              : n
          )
        );
      }
    },
    [editDialog?.nodeId, setNodes]
  );

  // Handle close edit dialog
  const handleCloseEditDialog = useCallback(() => {
    setEditDialog(null);
  }, []);

  // Handle delete node
  const handleDeleteNode = useCallback(() => {
    if (contextMenu?.nodeId) {
      setNodes((nds: any) =>
        nds.filter((n: any) => n.id !== contextMenu.nodeId)
      );
      setEdges((eds: any) =>
        eds.filter(
          (e: any) =>
            e.source !== contextMenu.nodeId && e.target !== contextMenu.nodeId
        )
      );
    }
  }, [contextMenu?.nodeId, setNodes, setEdges]);

  // Handle change node color
  const handleChangeNodeColor = useCallback(
    (color: string) => {
      if (contextMenu?.nodeId) {
        setNodes((nds: any) =>
          nds.map((n: any) =>
            n.id === contextMenu.nodeId
              ? { ...n, data: { ...n.data, color } }
              : n
          )
        );
      }
    },
    [contextMenu?.nodeId, setNodes]
  );

  // Create enhanced node types with context menu support
  const nodeTypesWithContext = {
    textNode: TextNode,
    decisionNode: DecisionNode,
    processNode: ProcessNode,
  };

  // Create node from context menu
  const handleCreateNode = useCallback(
    (type: string, position: { x: number; y: number }) => {
      const newNode: FlowNode = {
        id: `node_${Date.now()}`,
        type:
          type === 'text'
            ? 'textNode'
            : type === 'decision'
            ? 'decisionNode'
            : 'processNode',
        position:
          contextMenu?.type === 'canvas' ? contextMenu.flowPosition : position,
        data: {
          label:
            type === 'decision'
              ? 'Decision?'
              : type === 'process'
              ? 'Process'
              : 'New Node',
          color:
            type === 'decision'
              ? '#f59e0b'
              : type === 'process'
              ? '#3b82f6'
              : '#10b981',
        },
      };
      addNode(newNode);
    },
    [addNode, contextMenu]
  );

  // Close context menu
  const handleCloseContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  // Close context menu when clicking elsewhere or pressing escape
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setContextMenu(null);
        setEditDialog(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const onExportImage = useCallback(() => {
    if (reactFlowWrapper.current) {
      toPng(reactFlowWrapper.current, {
        backgroundColor: '#ffffff',
        width: 1200,
        height: 800,
      })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `flowchart_${
            new Date().toISOString().split('T')[0]
          }.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('Error exporting image:', error);
        });
    }
  }, []);

  return (
    <div className='w-full h-screen bg-gray-50'>
      <div className='p-4'>
        <Toolbar onExportImage={onExportImage} />
      </div>

      <div className='w-full h-[calc(100vh-120px)]' ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          onNodeContextMenu={handleNodeContextMenu}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypesWithContext}
          fitView
          className='bg-gray-50'
          defaultEdgeOptions={{
            animated: true,
            style: { stroke: '#3b82f6', strokeWidth: 2 },
          }}
        >
          <Background color='#e5e7eb' gap={20} size={1} />
          <MiniMap
            nodeColor={(node) => {
              if (node.type === 'decisionNode') return '#fef3c7';
              if (node.type === 'processNode') return '#dbeafe';
              return '#f0fdf4';
            }}
            className='bg-white border border-gray-200 rounded-lg'
          />
          <Controls className='bg-white border border-gray-200 rounded-lg shadow-sm' />
        </ReactFlow>
      </div>

      <Sidebar />
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onCreateNode={handleCreateNode}
          onEditNode={handleEditNode}
          onDeleteNode={handleDeleteNode}
          onChangeNodeColor={handleChangeNodeColor}
          onClose={handleCloseContextMenu}
          type={contextMenu.type}
        />
      )}

      {editDialog && (
        <EditNodeDialog
          isOpen={editDialog.isOpen}
          onClose={handleCloseEditDialog}
          currentLabel={editDialog.currentLabel}
          onSave={handleSaveEditedNode}
          position={editDialog.position}
        />
      )}
    </div>
  );
};

const FlowEditorWrapper: React.FC = () => {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  );
};

export default FlowEditorWrapper;
