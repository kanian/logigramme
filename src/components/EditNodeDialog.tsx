import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Edit2, Check, X } from 'lucide-react';

interface EditNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentLabel: string;
  onSave: (newLabel: string) => void;
  position: { x: number; y: number };
}

export const EditNodeDialog: React.FC<EditNodeDialogProps> = ({
  isOpen,
  onClose,
  currentLabel,
  onSave,
  position,
}) => {
  const [label, setLabel] = useState(currentLabel);

  useEffect(() => {
    setLabel(currentLabel);
  }, [currentLabel, isOpen]);

  const handleSave = () => {
    if (label.trim()) {
      onSave(label.trim());
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className='fixed inset-0 z-40' onClick={onClose} />

      <div
        className='fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[300px]'
        style={{
          left: Math.min(position.x, window.innerWidth - 320),
          top: Math.min(position.y, window.innerHeight - 120),
        }}
      >
        <div className='flex items-center gap-2 mb-3'>
          <Edit2 className='h-4 w-4 text-gray-600' />
          <h3 className='text-sm font-medium text-gray-900'>Edit Node</h3>
        </div>

        <div className='space-y-3'>
          <div>
            <label
              htmlFor='node-label'
              className='block text-xs font-medium text-gray-700 mb-1'
            >
              Label
            </label>
            <Input
              id='node-label'
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Enter node label...'
              autoFocus
            />
          </div>

          <div className='flex justify-end gap-2'>
            <Button size='sm' variant='outline' onClick={onClose}>
              <X className='h-3 w-3' />
              Cancel
            </Button>
            <Button size='sm' onClick={handleSave} disabled={!label.trim()}>
              <Check className='h-3 w-3' />
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
