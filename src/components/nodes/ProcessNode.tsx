import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

interface ProcessNodeData {
  label: string;
  color?: string;
}

function ProcessNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as ProcessNodeData;

  return (
    <div
      className={`
        px-4 py-3 shadow-lg rounded-md bg-blue-100 border-2 transition-all duration-200
        ${
          selected
            ? 'border-blue-500 shadow-blue-200'
            : 'border-blue-300 hover:border-blue-400'
        }
      `}
      style={{ minWidth: 140 }}
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
          className='text-sm font-medium text-center'
          style={{ color: nodeData.color || '#1d4ed8' }}
        >
          {nodeData.label}
        </div>
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

export default memo(ProcessNode);
