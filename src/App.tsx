import { useEffect } from 'react';
import FlowEditor from './components/FlowEditor';
import { useFlowStore } from './hooks/useFlowState';

export default function App() {
  const { loadFlow } = useFlowStore();

  useEffect(() => {
    // Load saved flowchart on app start
    loadFlow();
  }, [loadFlow]);

  return (
    <div className='w-full h-screen bg-gray-50'>
      <div className='flex flex-col h-full'>
        <header className='bg-white shadow-sm border-b border-gray-200 px-6 py-4'>
          <h1 className='text-2xl font-bold text-gray-900'>
            🌊 Flowchart Builder
          </h1>
          <p className='text-sm text-gray-600 mt-1'>
            Create beautiful flowcharts with drag & drop simplicity
          </p>
        </header>

        <main className='flex-1 overflow-hidden'>
          <FlowEditor />
        </main>
      </div>
    </div>
  );
}
