import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

interface DecisionNodeData {
  label: string;
  color?: string;
}

function DecisionNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as DecisionNodeData;

  return (
    <div
      className={`
        relative px-6 py-4 shadow-lg bg-yellow-100 border-2 transition-all duration-200
        ${
          selected
            ? 'border-yellow-500 shadow-yellow-200'
            : 'border-yellow-300 hover:border-yellow-400'
        }
      `}
      style={{
        minWidth: 120,
        minHeight: 80,
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        transform: 'rotate(0deg)',
      }}
    >
      <Handle
        type='target'
        position={Position.Top}
        className='w-3 h-3 !bg-yellow-400 !border-2 !border-white'
      />

      <div className='flex items-center justify-center h-full'>
        <div
          className='text-sm font-medium text-gray-700 text-center'
          style={{ color: nodeData.color || '#92400e' }}
        >
          {nodeData.label}
        </div>
      </div>

      <Handle
        type='source'
        position={Position.Right}
        id='yes'
        className='w-3 h-3 !bg-green-400 !border-2 !border-white'
      />
      <Handle
        type='source'
        position={Position.Left}
        id='no'
        className='w-3 h-3 !bg-red-400 !border-2 !border-white'
      />
    </div>
  );
}

export default memo(DecisionNode);
