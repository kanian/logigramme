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
        className='w-4 h-4 !border-3 !border-white !shadow-lg'
        style={{
          background: nodeData.color || '#92400e',
          border: '3px solid white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
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
        className='w-4 h-4 !border-3 !border-white !shadow-lg'
        style={{
          background: nodeData.color || '#92400e',
          border: '3px solid white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      />
      <Handle
        type='source'
        position={Position.Left}
        id='no'
        className='w-4 h-4 !border-3 !border-white !shadow-lg'
        style={{
          background: nodeData.color || '#92400e',
          border: '3px solid white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      />
    </div>
  );
}

export default memo(DecisionNode);
