import { Suspense } from 'react';
import ProcessLabClient from './ProcessLabPage';

// A simple loading component to show as a fallback
function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      <p className="text-center text-lg text-gray-700">Loading Lab Session...</p>
    </div>
  );
}

export default function ProcessLabPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProcessLabClient />
    </Suspense>
  );
}