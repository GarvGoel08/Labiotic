'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ProcessLabPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get('jobId');

  const [labJob, setLabJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState({
    completed: 0,
    total: 0,
    current: ''
  });

  useEffect(() => {
    if (!jobId) {
      router.push('/dashboard');
      return;
    }
    fetchLabJob();
  }, [jobId]);

  useEffect(() => {
    // Auto-start processing when lab job is loaded
    if (labJob && !processing) {
      const hasPendingOrFailed = labJob.experiments.some(exp => 
        exp.status === 'pending' || exp.status === 'failed'
      );
      
      if (hasPendingOrFailed) {
        processExperiments();
      }
    }
  }, [labJob]);

  // Auto-retry failed experiments after a delay
  useEffect(() => {
    if (labJob && !processing) {
      const failedExperiments = labJob.experiments.filter(exp => exp.status === 'failed');
      
      if (failedExperiments.length > 0) {
        const retryTimeout = setTimeout(() => {
          console.log('Auto-retrying failed experiments...');
          processExperiments();
        }, 5000); // Retry after 5 seconds

        return () => clearTimeout(retryTimeout);
      }
    }
  }, [labJob, processing]);

  const fetchLabJob = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`/api/lab-jobs?jobId=${jobId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        setLabJob(data.labJob);
        setProgress({
          completed: data.labJob.experiments.filter(exp => exp.status === 'completed').length,
          total: data.labJob.experiments.length,
          current: ''
        });
      } else {
        setError(data.message || 'Failed to fetch lab job');
      }
    } catch (error) {
      console.error('Error fetching lab job:', error);
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const processExperiments = async () => {
    if (!labJob) return;
    
    setProcessing(true);
    setError('');
    const token = localStorage.getItem('token');
    
    const pendingExperiments = labJob.experiments
      .map((exp, index) => ({ ...exp, index }))
      .filter(exp => exp.status === 'pending' || exp.status === 'failed');

    // Process experiments in parallel with a concurrency limit
    const concurrencyLimit = 3;
    const results = [];
    
    for (let i = 0; i < pendingExperiments.length; i += concurrencyLimit) {
      const batch = pendingExperiments.slice(i, i + concurrencyLimit);
      
      const promises = batch.map(async (experiment) => {
        try {
          setProgress(prev => ({
            ...prev,
            current: `Processing: ${experiment.title}`
          }));

          const response = await fetch('/api/process-experiment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              jobId: jobId,
              experimentIndex: experiment.index
            })
          });

          const result = await response.json();
          
          if (response.ok) {
            setProgress(prev => ({
              ...prev,
              completed: prev.completed + 1
            }));
            
            // Update local state
            setLabJob(prev => {
              const updated = { ...prev };
              updated.experiments[experiment.index] = {
                ...updated.experiments[experiment.index],
                status: 'completed',
                generatedContent: result.result,
                error: null
              };
              return updated;
            });
          } else {
            // Mark as failed in local state
            setLabJob(prev => {
              const updated = { ...prev };
              updated.experiments[experiment.index] = {
                ...updated.experiments[experiment.index],
                status: 'failed',
                error: result.error || 'Processing failed'
              };
              return updated;
            });
          }
          
          return result;
        } catch (error) {
          console.error(`Error processing experiment ${experiment.index}:`, error);
          setLabJob(prev => {
            const updated = { ...prev };
            updated.experiments[experiment.index] = {
              ...updated.experiments[experiment.index],
              status: 'failed',
              error: 'Network error'
            };
            return updated;
          });
        }
      });

      await Promise.allSettled(promises);
    }

    setProgress(prev => ({ ...prev, current: '' }));
    setProcessing(false);
  };

  const retryExperiment = async (experimentIndex) => {
    const token = localStorage.getItem('token');
    
    try {
      // First reset the experiment
      await fetch('/api/process-experiment', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          jobId: jobId,
          experimentIndex: experimentIndex
        })
      });

      // Update local state
      setLabJob(prev => {
        const updated = { ...prev };
        updated.experiments[experimentIndex].status = 'pending';
        updated.experiments[experimentIndex].error = null;
        return updated;
      });

      // Process this experiment
      setProgress(prev => ({
        ...prev,
        current: `Retrying: ${labJob.experiments[experimentIndex].title}`
      }));

      const response = await fetch('/api/process-experiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          jobId: jobId,
          experimentIndex: experimentIndex
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        setProgress(prev => ({
          ...prev,
          completed: prev.completed + 1,
          current: ''
        }));
        
        setLabJob(prev => {
          const updated = { ...prev };
          updated.experiments[experimentIndex] = {
            ...updated.experiments[experimentIndex],
            status: 'completed',
            generatedContent: result.result,
            error: null
          };
          return updated;
        });
      } else {
        setLabJob(prev => {
          const updated = { ...prev };
          updated.experiments[experimentIndex] = {
            ...updated.experiments[experimentIndex],
            status: 'failed',
            error: result.error || 'Retry failed'
          };
          return updated;
        });
      }
    } catch (error) {
      console.error('Error retrying experiment:', error);
    }
  };

  const exportFile = async (format) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`/api/export-lab?jobId=${jobId}&format=${format}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${labJob.practicalTitle.replace(/[^a-zA-Z0-9]/g, '_')}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Export failed');
      }
    } catch (error) {
      console.error('Export error:', error);
      setError('Export failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!labJob) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lab Job Not Found</h2>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const allCompleted = labJob.experiments.every(exp => exp.status === 'completed');
  const hasPending = labJob.experiments.some(exp => exp.status === 'pending');
  const hasFailed = labJob.experiments.some(exp => exp.status === 'failed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{labJob.practicalTitle}</h1>
              <p className="text-gray-600 mb-1">Subject: {labJob.subject} ({labJob.subjectCode})</p>
              <p className="text-gray-600">Instructor: {labJob.instructorName}</p>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {processing ? '🔄 Generating Lab Experiments...' : allCompleted ? '✅ Lab File Generation Complete!' : '⏳ Preparing to Generate...'}
          </h2>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Experiments Completed</span>
              <span>{progress.completed}/{progress.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  processing ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${(progress.completed / progress.total) * 100}%` }}
              ></div>
            </div>
            {progress.current && (
              <p className="text-sm text-indigo-600 mt-2 animate-pulse flex items-center">
                <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full mr-2 animate-ping"></span>
                {progress.current}
              </p>
            )}
            
            {processing && !progress.current && (
              <p className="text-sm text-blue-600 mt-2 flex items-center">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2 animate-ping"></span>
                AI is analyzing and generating experiments...
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            {allCompleted && (
              <>
                <div className="flex gap-4">
                  <button
                    onClick={() => exportFile('docx')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center"
                  >
                    📝 Export DOCX
                  </button>
                  <button
                    disabled={true}
                    onClick={() => exportFile('pdf')}
                    className="bg-red-300 text-white px-6 py-3 rounded-lg transition font-medium flex items-center"
                  >
                    📄 Export PDF(Coming Soon)
                  </button>
                </div>
                <div className="w-full mt-2">
                  <p className="text-sm text-green-600 font-medium">
                    🎉 All experiments have been generated successfully! You can now export your lab file.
                  </p>
                </div>
              </>
            )}
            
            {!allCompleted && !processing && (
              <div className="w-full">
                <p className="text-sm text-gray-600">
                  ⚡ Processing will start automatically. Failed experiments will be retried automatically.
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Experiments List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            📋 Experiments ({progress.completed}/{progress.total} completed)
          </h2>
          
          <div className="space-y-6">
            {labJob.experiments.map((experiment, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Experiment Header */}
                <div
                  className={`p-4 ${
                    experiment.status === 'completed' ? 'bg-green-50 border-l-4 border-green-500' :
                    experiment.status === 'processing' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                    experiment.status === 'failed' ? 'bg-red-50 border-l-4 border-red-500' :
                    'bg-gray-50 border-l-4 border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 flex items-center">
                        <span className="mr-2">
                          {experiment.status === 'completed' ? '✅' :
                           experiment.status === 'processing' ? '⏳' :
                           experiment.status === 'failed' ? '❌' : '⭕'}
                        </span>
                        Experiment {experiment.experimentNumber}: {experiment.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          experiment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          experiment.status === 'processing' ? 'bg-yellow-100 text-yellow-800 animate-pulse' :
                          experiment.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {experiment.status === 'processing' ? '🔄 Generating...' :
                           experiment.status === 'failed' ? '🔄 Will retry automatically...' :
                           experiment.status.charAt(0).toUpperCase() + experiment.status.slice(1)}
                        </span>
                      </div>
                      
                      {experiment.error && (
                        <p className="text-red-600 text-sm mt-2 flex items-center">
                          ⚠️ {experiment.error} (Auto-retry in progress...)
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Generated Content Preview */}
                {experiment.status === 'completed' && experiment.generatedContent && (
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      📄 Generated Content Preview
                    </h4>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">🎯 Aim:</span>
                        <p className="text-gray-600 mt-1">{experiment.generatedContent.aim}</p>
                      </div>
                      
                      {experiment.generatedContent.apparatus && experiment.generatedContent.apparatus.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700">🔧 Apparatus:</span>
                          <ul className="text-gray-600 mt-1 list-disc list-inside">
                            {experiment.generatedContent.apparatus.slice(0, 3).map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                            {experiment.generatedContent.apparatus.length > 3 && (
                              <li className="text-gray-500">... and {experiment.generatedContent.apparatus.length - 3} more items</li>
                            )}
                          </ul>
                        </div>
                      )}
                      
                      <div>
                        <span className="font-medium text-gray-700">📚 Theory Preview:</span>
                        <p className="text-gray-600 mt-1">
                          {experiment.generatedContent.theory?.substring(0, 150)}
                          {experiment.generatedContent.theory?.length > 150 ? '...' : ''}
                        </p>
                      </div>
                      
                      {experiment.generatedContent.procedure && experiment.generatedContent.procedure.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700">📝 Procedure Steps:</span>
                          <p className="text-gray-600 mt-1">
                            {experiment.generatedContent.procedure.length} steps generated
                          </p>
                        </div>
                      )}
                      
                      <div className="pt-2 border-t border-gray-100">
                        <span className="text-xs text-green-600 font-medium">
                          ✨ Complete experiment generated successfully! It will appear in your exported file.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Processing Animation */}
                {experiment.status === 'processing' && (
                  <div className="p-4 border-t border-gray-200 bg-yellow-50">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                      <span className="text-sm text-yellow-700">AI is generating this experiment...</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
