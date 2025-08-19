import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

interface CustomNodeData {
  label: string;
  color?: string;
  description?: string;
}

function TextNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as CustomNodeData;

  return (
    <div
      className={`
        px-4 py-2 shadow-lg rounded-lg bg-white border-2 transition-all duration-200
        ${
          selected
            ? 'border-blue-500 shadow-blue-200'
            : 'border-gray-200 hover:border-gray-300'
        }
      `}
      style={{ minWidth: 120 }}
    >
      <Handle
        type='target'
        position={Position.Top}
        className='w-4 h-4 !bg-blue-500 !border-3 !border-white !shadow-lg'
        style={{
          background: '#3b82f6',
          border: '3px solid white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      />

      <div className='flex flex-col items-center'>
        <div
          className='text-sm font-medium text-gray-700 text-center'
          style={{ color: nodeData.color || '#374151' }}
        >
          {nodeData.label}
        </div>
        {nodeData.description && (
          <div className='text-xs text-gray-500 mt-1 text-center'>
            {nodeData.description}
          </div>
        )}
      </div>

      <Handle
        type='source'
        position={Position.Bottom}
        className='w-4 h-4 !bg-blue-500 !border-3 !border-white !shadow-lg'
        style={{
          background: '#3b82f6',
          border: '3px solid white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      />
    </div>
  );
}

export default memo(TextNode);
