'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Profile form states
  const [profile, setProfile] = useState({
    fullName: '',
    rollNumber: '',
    course: '',
    semester: '',
    section: '',
    university: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      department: '',
    },
    isProfileComplete: false
  });

  // Gemini API Key state
  const [geminiApiKey, setGeminiApiKey] = useState('');

  // Lab generation form states
  const [labForm, setLabForm] = useState({
    instructorName: '',
    subject: '',
    subjectCode: '',
    practicalTitle: '',
    experiments: [
      {
        title: '',
        additionalNotes: '',
      }
    ]
  });

  // Bulk experiment import
  const [bulkExperiments, setBulkExperiments] = useState('');
  
  // Recent lab jobs
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    fetchUserProfile();
    fetchRecentJobs();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
        
        // Set profile data if it exists
        if (userData.user.profile) {
          setProfile({
            fullName: userData.user.profile.fullName || '',
            rollNumber: userData.user.profile.rollNumber || '',
            course: userData.user.profile.course || '',
            semester: userData.user.profile.semester || '',
            section: userData.user.profile.section || '',
            university: {
              name: userData.user.profile.university?.name || '',
              address: userData.user.profile.university?.address || '',
              city: userData.user.profile.university?.city || '',
              state: userData.user.profile.university?.state || '',
              pincode: userData.user.profile.university?.pincode || '',
              department: userData.user.profile.university?.department || '',
            },
            isProfileComplete: userData.user.profile.isProfileComplete || false
          });
          setGeminiApiKey(userData.user.decryptedGeminiKey || '');
        }
      } else {
        // Redirect to login if not authenticated
        router.push('/login');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentJobs = async () => {
    try {
      const response = await fetch('/api/lab-jobs', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRecentJobs(data.labJobs || []);
      }
    } catch (error) {
      console.error('Error fetching recent jobs:', error);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          profile: {
            ...profile,
            isProfileComplete: true
          },
          geminiApiKey: geminiApiKey
        })
      });

      if (response.ok) {
        alert('Profile updated successfully!');
        fetchUserProfile(); // Refresh user data
      } else {
        const data = await response.json();
        alert(data.message || 'Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  const addExperiment = () => {
    setLabForm({
      ...labForm,
      experiments: [
        ...labForm.experiments,
        {
          title: '',
          additionalNotes: '',
        }
      ]
    });
  };

  const removeExperiment = (index) => {
    const newExperiments = labForm.experiments.filter((_, i) => i !== index);
    setLabForm({
      ...labForm,
      experiments: newExperiments
    });
  };

  const updateExperiment = (index, field, value) => {
    const newExperiments = [...labForm.experiments];
    newExperiments[index][field] = value;
    setLabForm({
      ...labForm,
      experiments: newExperiments
    });
  };

  const handleBulkImport = () => {
    if (!bulkExperiments.trim()) return;
    
    const experimentLines = bulkExperiments
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    const newExperiments = experimentLines.map(line => ({
      title: line,
      additionalNotes: '',
    }));

    setLabForm({
      ...labForm,
      experiments: newExperiments.length > 0 ? newExperiments : labForm.experiments
    });

    setBulkExperiments('');
    alert(`${newExperiments.length} experiments imported successfully!`);
  };

  const handleLabGeneration = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!labForm.instructorName || !labForm.subject || !labForm.subjectCode || !labForm.practicalTitle) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate experiments
    if (labForm.experiments.length === 0 || labForm.experiments.some(exp => !exp.title.trim())) {
      alert('Please add at least one experiment with a title');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/lab-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(labForm)
      });

      const data = await response.json();
      
      if (response.ok) {
        // Redirect to processing page
        router.push(`/process-lab?jobId=${data.jobId}`);
      } else {
        alert(data.message || 'Failed to create lab job');
      }
    } catch (error) {
      console.error('Error creating lab job:', error);
      alert('Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center h-auto sm:h-16 py-4 sm:py-0">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Labiotic Dashboard
              </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <span className="text-gray-700 text-sm sm:text-base">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b overflow-x-auto">
            <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Complete Profile
                {!user?.profile?.isProfileComplete && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Required
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('generate')}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'generate'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Generate Lab File
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'jobs'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Lab Jobs ({recentJobs.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8">
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
              <p className="text-gray-600">
                Please complete your profile information to start generating lab files. This information will be used to customize your lab reports.
              </p>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-8">
              {/* Gemini API Key Section */}
              <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  🔑 Gemini API Key (Required)
                </h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  We need your Gemini API key to generate lab files. Don't worry - it's stored securely and encrypted in our database.
                </p>
                <div>
                  <label htmlFor="geminiApiKey" className="block text-sm font-medium text-gray-700 mb-2">
                    Gemini API Key
                  </label>
                  <input
                    type="password"
                    id="geminiApiKey"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your Gemini API key"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      Get your free Gemini API key here →
                    </a>
                  </p>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={profile.fullName}
                      onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      id="rollNumber"
                      value={profile.rollNumber}
                      onChange={(e) => setProfile({...profile, rollNumber: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your roll number"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                      Course
                    </label>
                    <input
                      type="text"
                      id="course"
                      value={profile.course}
                      onChange={(e) => setProfile({...profile, course: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., B.Tech Computer Science"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
                      Semester
                    </label>
                    <select
                      id="semester"
                      value={profile.semester}
                      onChange={(e) => setProfile({...profile, semester: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Semester</option>
                      {Array.from({length: 8}, (_, i) => (
                        <option key={i+1} value={i+1}>{i+1}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-2">
                      Section
                    </label>
                    <input
                      type="text"
                      id="section"
                      value={profile.section}
                      onChange={(e) => setProfile({...profile, section: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., A, B, C"
                    />
                  </div>
                </div>
              </div>

              {/* University Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">University/Institution Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="universityName" className="block text-sm font-medium text-gray-700 mb-2">
                      University/College Name
                    </label>
                    <input
                      type="text"
                      id="universityName"
                      value={profile.university.name}
                      onChange={(e) => setProfile({
                        ...profile, 
                        university: {...profile.university, name: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Delhi Technological University"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      id="department"
                      value={profile.university.department}
                      onChange={(e) => setProfile({
                        ...profile, 
                        university: {...profile.university, department: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Computer Science & Engineering"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={profile.university.city}
                      onChange={(e) => setProfile({
                        ...profile, 
                        university: {...profile.university, city: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={profile.university.state}
                      onChange={(e) => setProfile({
                        ...profile, 
                        university: {...profile.university, state: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="State"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      value={profile.university.pincode}
                      onChange={(e) => setProfile({
                        ...profile, 
                        university: {...profile.university, pincode: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Pincode"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      id="address"
                      rows="3"
                      value={profile.university.address}
                      onChange={(e) => setProfile({
                        ...profile, 
                        university: {...profile.university, address: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Full address of your university/college"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Generate Lab File Tab */}
        {activeTab === 'generate' && (
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8">
            {/* Check if profile is complete */}
            {!user?.profile?.isProfileComplete ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">⚠️</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Profile Incomplete</h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  Please complete your profile first to start generating lab files.
                </p>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Complete Profile
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Generate Lab File</h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Fill in the details below to generate your professional lab file in DOCX and PDF format.
                  </p>
                </div>

                <form onSubmit={handleLabGeneration} className="space-y-8">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Lab Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="instructorName" className="block text-sm font-medium text-gray-700 mb-2">
                          Instructor Name
                        </label>
                        <input
                          type="text"
                          id="instructorName"
                          value={labForm.instructorName}
                          onChange={(e) => setLabForm({...labForm, instructorName: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Prof. Name"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          value={labForm.subject}
                          onChange={(e) => setLabForm({...labForm, subject: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Data Structures"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="subjectCode" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject Code
                        </label>
                        <input
                          type="text"
                          id="subjectCode"
                          value={labForm.subjectCode}
                          onChange={(e) => setLabForm({...labForm, subjectCode: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., CS201"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="practicalTitle" className="block text-sm font-medium text-gray-700 mb-2">
                          Practical Title
                        </label>
                        <input
                          type="text"
                          id="practicalTitle"
                          value={labForm.practicalTitle}
                          onChange={(e) => setLabForm({...labForm, practicalTitle: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Data Structures Lab Manual"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Experiments */}
                  <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
                      <h3 className="text-lg font-semibold text-gray-900">Experiments</h3>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={addExperiment}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                        >
                          + Add Experiment
                        </button>
                      </div>
                    </div>

                    {/* Bulk Import Section */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="text-md font-medium text-gray-900 mb-3">Quick Import from Manual</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Paste your experiment titles from your manual (one per line) and we'll add them automatically:
                      </p>
                      <textarea
                        rows="4"
                        value={bulkExperiments}
                        onChange={(e) => setBulkExperiments(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder={`Example:\nImplementation of Stack using Arrays\nBinary Search Tree Operations\nLinear Search Algorithm\nQuick Sort Implementation`}
                      />
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 space-y-2 sm:space-y-0">
                        <span className="text-xs text-gray-500">
                          This will replace existing experiments
                        </span>
                        <button
                          type="button"
                          onClick={handleBulkImport}
                          disabled={!bulkExperiments.trim()}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm w-full sm:w-auto"
                        >
                          Import Experiments
                        </button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {labForm.experiments.map((experiment, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row justify-between items-start mb-4 space-y-2 sm:space-y-0">
                            <h4 className="text-md font-medium text-gray-900">
                              Experiment {index + 1}
                            </h4>
                            {labForm.experiments.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeExperiment(index)}
                                className="text-red-600 hover:text-red-800 font-medium text-sm"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="grid gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Experiment Title
                              </label>
                              <input
                                type="text"
                                value={experiment.title}
                                onChange={(e) => updateExperiment(index, 'title', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., Implementation of Stack using Arrays - To learn stack data structure"
                                required
                              />
                              <p className="text-sm text-gray-500 mt-1">
                                Include both the experiment name and its objective in the title
                              </p>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Notes (Optional)
                              </label>
                              <textarea
                                rows="3"
                                value={experiment.additionalNotes}
                                onChange={(e) => updateExperiment(index, 'additionalNotes', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Any additional notes, methodology, or specific requirements for this experiment..."
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                      type="button"
                      onClick={() => setLabForm({
                        instructorName: '',
                        subject: '',
                        subjectCode: '',
                        practicalTitle: '',
                        experiments: [{ title: '', additionalNotes: '' }]
                      })}
                      className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto order-2 sm:order-1"
                    >
                      Clear Form
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 w-full sm:w-auto order-1 sm:order-2"
                    >
                      Generate Lab File
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}

        {/* Lab Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8">
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Lab Jobs</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                View and manage your recent lab file generation jobs.
              </p>
            </div>

            {recentJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl">📄</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Lab Jobs Yet</h3>
                <p className="text-gray-600 mb-6">
                  Create your first lab file by clicking on the "Generate Lab File" tab.
                </p>
                <button
                  onClick={() => setActiveTab('generate')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Create Lab File
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div
                    key={job._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {job.practicalTitle}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {job.subject} ({job.subjectCode}) • Instructor: {job.instructorName}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{job.experiments.length} experiments</span>
                          <span>Created: {new Date(job.createdAt).toLocaleDateString()}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.status === 'completed' ? 'bg-green-100 text-green-800' :
                            job.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            job.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                        </div>
                        {job.status === 'processing' && (
                          <div className="mt-2">
                            <div className="text-xs text-gray-500 mb-1">
                              Progress: {job.progress?.completed || 0}/{job.progress?.total || job.experiments.length}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ 
                                  width: `${((job.progress?.completed || 0) / (job.progress?.total || job.experiments.length)) * 100}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 w-full sm:w-auto">
                        <button
                          onClick={() => router.push(`/process-lab?jobId=${job._id}`)}
                          className="flex-1 sm:flex-initial bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                        >
                          {job.status === 'completed' ? 'View & Export' : 'Continue Processing'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
