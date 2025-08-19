import React from 'react';
import {
  Plus,
  Minus,
  Download,
  Save,
  Trash2,
  Circle,
  Square,
  Diamond,
  ArrowRight,
} from 'lucide-react';
import { useReactFlow } from '@xyflow/react';
import { useFlowStore } from '../hooks/useFlowState';
import { exportFlowchartAsJSON, downloadJSON } from '../utils/storage';
import { FlowNode } from '../types/flow';

interface ToolbarProps {
  onExportImage?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onExportImage }) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const { nodes, edges, addNode, resetFlow, saveFlow } = useFlowStore();

  const addNewNode = (type: string) => {
    const newNode: FlowNode = {
      id: `node_${Date.now()}`,
      type:
        type === 'text'
          ? 'textNode'
          : type === 'decision'
          ? 'decisionNode'
          : 'processNode',
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      },
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
  };

  const handleExportJSON = () => {
    const jsonString = exportFlowchartAsJSON(nodes, edges);
    downloadJSON(
      jsonString,
      `flowchart_${new Date().toISOString().split('T')[0]}.json`
    );
  };

  return (
    <div className='bg-white shadow-lg rounded-lg p-4 flex flex-wrap gap-2 items-center border border-gray-200'>
      {/* Node Creation Buttons */}
      <div className='flex gap-1 border-r border-gray-200 pr-3'>
        <button
          onClick={() => addNewNode('text')}
          className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-green-50 hover:bg-green-100 rounded-md transition-colors duration-200'
          title='Add Text Node'
        >
          <Circle className='w-4 h-4' />
          Text
        </button>
        <button
          onClick={() => addNewNode('process')}
          className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors duration-200'
          title='Add Process Node'
        >
          <Square className='w-4 h-4' />
          Process
        </button>
        <button
          onClick={() => addNewNode('decision')}
          className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-yellow-50 hover:bg-yellow-100 rounded-md transition-colors duration-200'
          title='Add Decision Node'
        >
          <Diamond className='w-4 h-4' />
          Decision
        </button>
      </div>

      {/* Zoom Controls */}
      <div className='flex gap-1 border-r border-gray-200 pr-3'>
        <button
          onClick={() => zoomIn()}
          className='p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200'
          title='Zoom In'
        >
          <Plus className='w-4 h-4' />
        </button>
        <button
          onClick={() => zoomOut()}
          className='p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200'
          title='Zoom Out'
        >
          <Minus className='w-4 h-4' />
        </button>
        <button
          onClick={() => fitView()}
          className='p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200'
          title='Fit View'
        >
          <ArrowRight className='w-4 h-4' />
        </button>
      </div>

      {/* File Operations */}
      <div className='flex gap-1 border-r border-gray-200 pr-3'>
        <button
          onClick={saveFlow}
          className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200'
          title='Save to LocalStorage'
        >
          <Save className='w-4 h-4' />
          Save
        </button>
        <button
          onClick={handleExportJSON}
          className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200'
          title='Export as JSON'
        >
          <Download className='w-4 h-4' />
          Export
        </button>
        {onExportImage && (
          <button
            onClick={onExportImage}
            className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200'
            title='Export as Image'
          >
            <Download className='w-4 h-4' />
            PNG
          </button>
        )}
      </div>

      {/* Utility Actions */}
      <div className='flex gap-1'>
        <button
          onClick={resetFlow}
          className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors duration-200'
          title='Reset Flow'
        >
          <Trash2 className='w-4 h-4' />
          Reset
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
