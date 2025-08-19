import React from 'react';
import {
  Plus,
  Circle,
  Square,
  Diamond,
  Edit,
  Trash2,
  Palette,
} from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onCreateNode?: (type: string, position: { x: number; y: number }) => void;
  onEditNode?: () => void;
  onDeleteNode?: () => void;
  onChangeNodeColor?: (color: string) => void;
  type: 'canvas' | 'node';
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onClose,
  onCreateNode,
  onEditNode,
  onDeleteNode,
  onChangeNodeColor,
  type,
}) => {
  const handleCreateNode = (nodeType: string) => {
    onCreateNode?.(nodeType, { x, y });
    onClose();
  };

  const handleEditNode = () => {
    onEditNode?.();
    onClose();
  };

  const handleDeleteNode = () => {
    onDeleteNode?.();
    onClose();
  };

  const handleChangeColor = (color: string) => {
    onChangeNodeColor?.(color);
    onClose();
  };

  const createMenuItems = [
    {
      type: 'text',
      label: 'Text Node',
      icon: Circle,
      description: 'Basic text node',
      shortcut: '⌘T',
    },
    {
      type: 'process',
      label: 'Process Node',
      icon: Square,
      description: 'Process or action',
      shortcut: '⌘P',
    },
    {
      type: 'decision',
      label: 'Decision Node',
      icon: Diamond,
      description: 'Decision point',
      shortcut: '⌘D',
    },
  ];

  const nodeColors = [
    { name: 'Green', value: '#10b981' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Yellow', value: '#f59e0b' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Pink', value: '#ec4899' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div className='fixed inset-0 z-50' onClick={onClose} />

      {/* Context Menu - shadcn/ui style */}
      <div
        className='fixed z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
        style={{
          left: x,
          top: y,
        }}
      >
        {type === 'canvas' ? (
          <>
            {/* Menu Label */}
            <div className='px-2 py-1.5 text-sm font-semibold text-foreground'>
              <div className='flex items-center gap-2'>
                <Plus className='h-4 w-4' />
                Create Node
              </div>
            </div>

            {/* Separator */}
            <div className='-mx-1 my-1 h-px bg-muted' />

            {/* Menu Items */}
            {createMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.type}
                  className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                  onClick={() => handleCreateNode(item.type)}
                >
                  <Icon className='mr-2 h-4 w-4' />
                  <span>{item.label}</span>
                  <span className='ml-auto text-xs tracking-widest text-muted-foreground'>
                    {item.shortcut}
                  </span>
                </div>
              );
            })}

            {/* Separator */}
            <div className='-mx-1 my-1 h-px bg-muted' />

            {/* Sub Label */}
            <div className='px-2 py-1.5 text-xs text-muted-foreground'>
              Click to create nodes
            </div>
          </>
        ) : (
          <>
            {/* Node Menu Label */}
            <div className='px-2 py-1.5 text-sm font-semibold text-foreground'>
              <div className='flex items-center gap-2'>
                <Edit className='h-4 w-4' />
                Node Actions
              </div>
            </div>

            {/* Separator */}
            <div className='-mx-1 my-1 h-px bg-muted' />

            {/* Edit Node */}
            <div
              className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground'
              onClick={handleEditNode}
            >
              <Edit className='mr-2 h-4 w-4' />
              <span>Edit Node</span>
              <span className='ml-auto text-xs tracking-widest text-muted-foreground'>
                ⌘E
              </span>
            </div>

            {/* Change Color Submenu */}
            <div className='relative'>
              <div className='px-2 py-1.5 text-xs text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <Palette className='h-3 w-3' />
                  Change Color
                </div>
              </div>
              <div className='flex flex-wrap gap-1 px-2 pb-2'>
                {nodeColors.map((color) => (
                  <div
                    key={color.value}
                    className='h-6 w-6 rounded cursor-pointer hover:scale-110 transition-transform border border-gray-300'
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleChangeColor(color.value)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Separator */}
            <div className='-mx-1 my-1 h-px bg-muted' />

            {/* Delete Node */}
            <div
              className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-destructive'
              onClick={handleDeleteNode}
            >
              <Trash2 className='mr-2 h-4 w-4' />
              <span>Delete Node</span>
              <span className='ml-auto text-xs tracking-widest text-muted-foreground'>
                ⌘⌫
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ContextMenu;
