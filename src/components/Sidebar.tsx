import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Palette, Settings } from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen: defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const nodeColors = [
    { name: 'Green', value: '#10b981', bg: 'bg-green-500' },
    { name: 'Blue', value: '#3b82f6', bg: 'bg-blue-500' },
    { name: 'Purple', value: '#8b5cf6', bg: 'bg-purple-500' },
    { name: 'Yellow', value: '#f59e0b', bg: 'bg-yellow-500' },
    { name: 'Red', value: '#ef4444', bg: 'bg-red-500' },
    { name: 'Pink', value: '#ec4899', bg: 'bg-pink-500' },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full bg-white shadow-xl border-l border-gray-200
          transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ width: '300px' }}
      >
        <div className='p-4 border-b border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-900'>Customization</h2>
          <p className='text-sm text-gray-600'>Personalize your flowchart</p>
        </div>

        <div className='p-4'>
          <div className='mb-6'>
            <div className='flex items-center gap-2 mb-3'>
              <Palette className='w-4 h-4 text-gray-600' />
              <h3 className='text-sm font-medium text-gray-900'>Node Colors</h3>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              {nodeColors.map((color) => (
                <button
                  key={color.value}
                  className={`
                    ${color.bg} w-full h-10 rounded-lg shadow-sm hover:shadow-md
                    transition-shadow duration-200 border-2 border-white hover:border-gray-300
                  `}
                  title={color.name}
                  onClick={() => {
                    // This would be connected to node color changing functionality
                    console.log(`Selected color: ${color.value}`);
                  }}
                />
              ))}
            </div>
          </div>

          <div className='mb-6'>
            <div className='flex items-center gap-2 mb-3'>
              <Settings className='w-4 h-4 text-gray-600' />
              <h3 className='text-sm font-medium text-gray-900'>Settings</h3>
            </div>
            <div className='space-y-3'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                  defaultChecked
                />
                <span className='ml-2 text-sm text-gray-700'>
                  Animated edges
                </span>
              </label>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                  defaultChecked
                />
                <span className='ml-2 text-sm text-gray-700'>
                  Show mini map
                </span>
              </label>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />
                <span className='ml-2 text-sm text-gray-700'>Grid snap</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed top-1/2 bg-white shadow-lg border border-gray-200 rounded-l-lg p-2
          hover:bg-gray-50 transition-all duration-300 ease-in-out z-40
          ${isOpen ? 'right-[300px]' : 'right-0'}
        `}
        style={{ transform: 'translateY(-50%)' }}
      >
        {isOpen ? (
          <ChevronRight className='w-4 h-4 text-gray-600' />
        ) : (
          <ChevronLeft className='w-4 h-4 text-gray-600' />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-25 z-40'
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
