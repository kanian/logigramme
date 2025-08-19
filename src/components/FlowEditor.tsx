import React, { useCallback, useRef } from 'react';
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
} from '@xyflow/react';
import { toPng } from 'html-to-image';

import { useFlowStore } from '../hooks/useFlowState';
import Toolbar from './Toolbar';
import Sidebar from './Sidebar';
import TextNode from './nodes/TextNode';
import DecisionNode from './nodes/DecisionNode';
import ProcessNode from './nodes/ProcessNode';

const nodeTypes = {
  textNode: TextNode,
  decisionNode: DecisionNode,
  processNode: ProcessNode,
};

const FlowEditor: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodes, edges, setNodes, setEdges } = useFlowStore();

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
    (_event: React.MouseEvent, node: any) => {
      const newLabel = prompt('Enter new label:', node.data.label);
      if (newLabel !== null) {
        setNodes((nds: any) =>
          nds.map((n: any) =>
            n.id === node.id
              ? { ...n, data: { ...n.data, label: newLabel } }
              : n
          )
        );
      }
    },
    [setNodes]
  );

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
          nodeTypes={nodeTypes}
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
