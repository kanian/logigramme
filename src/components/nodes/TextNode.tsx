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
        className='w-3 h-3 !bg-blue-400 !border-2 !border-white'
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
        className='w-3 h-3 !bg-blue-400 !border-2 !border-white'
      />
    </div>
  );
}

export default memo(TextNode);
