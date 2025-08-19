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
        className='w-3 h-3 !bg-blue-400 !border-2 !border-white'
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
        className='w-3 h-3 !bg-blue-400 !border-2 !border-white'
      />
    </div>
  );
}

export default memo(ProcessNode);
