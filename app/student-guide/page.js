export default function StudentGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Student Guide to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Labiotic</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know to create perfect lab reports for Indian universities
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Getting Started</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Create Your Account</h3>
                  <p className="text-gray-700 mb-4">
                    Sign up with your university email to get started. We support students from all major Indian universities 
                    including DTU, NSUT, IIIT Delhi, IGDTUW, and JMI.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 font-medium">Pro Tip: Use your .edu email for instant verification!</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Choose Your Template</h3>
                  <p className="text-gray-700 mb-4">
                    Select from our collection of AICTE-compliant templates designed specifically for Indian universities:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Computer Science:</strong> Data Structures, DBMS, Software Engineering, Computer Networks</li>
                    <li><strong>Electronics:</strong> Digital Electronics, Microprocessors, VLSI Design</li>
                    <li><strong>Mechanical:</strong> Fluid Mechanics, Thermodynamics, Machine Design</li>
                    <li><strong>General:</strong> Physics, Chemistry, Engineering Drawing</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Input Your Data</h3>
                  <p className="text-gray-700 mb-4">
                    Simply enter your experiment details, observations, and results. Our AI will help structure everything properly:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Required Information</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Experiment title</li>
                        <li>• Objective/Aim</li>
                        <li>• Equipment used</li>
                        <li>• Procedure steps</li>
                        <li>• Observations</li>
                        <li>• Results & Conclusion</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Optional Additions</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Circuit diagrams</li>
                        <li>• Data tables</li>
                        <li>• Graphs & charts</li>
                        <li>• Error analysis</li>
                        <li>• References</li>
                        <li>• Appendices</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. Generate & Download</h3>
                  <p className="text-gray-700 mb-4">
                    Click generate and watch as AI creates your perfectly formatted lab report in seconds. 
                    Download in DOCX or PDF format ready for submission.
                  </p>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className="text-gray-700">DOCX for editing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-gray-700">PDF for submission</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject-Specific Guides */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Subject-Specific Tips</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Data Structures & Algorithms</h4>
                  <p className="text-gray-700">Include time complexity analysis, algorithm pseudocode, and execution traces. Use our built-in code formatting for clean presentation.</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Database Management</h4>
                  <p className="text-gray-700">Include ER diagrams, SQL queries, and normalized table structures. Our templates handle complex database schemas automatically.</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Software Engineering</h4>
                  <p className="text-gray-700">Document requirements, design patterns, and testing results. Include UML diagrams and project timelines for complete reports.</p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Computer Networks</h4>
                  <p className="text-gray-700">Show network topologies, packet analysis, and performance metrics. Our templates support technical diagrams and protocol explanations.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Start Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Start Checklist</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">Create account</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-xs">2</span>
                  </div>
                  <span className="text-gray-700">Choose template</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-xs">3</span>
                  </div>
                  <span className="text-gray-700">Enter experiment data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-xs">4</span>
                  </div>
                  <span className="text-gray-700">Generate & download</span>
                </div>
              </div>
            </div>

            {/* University Support */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Supported Universities</h3>
              <div className="space-y-2 text-gray-700">
                <p>✓ Delhi Technological University (DTU)</p>
                <p>✓ Netaji Subhas University of Technology (NSUT)</p>
                <p>✓ IIIT Delhi</p>
                <p>✓ Indira Gandhi Delhi Technical University for Women (IGDTUW)</p>
                <p>✓ Jamia Millia Islamia (JMI)</p>
                <p className="text-sm text-gray-600 mt-3">+ 50+ more universities across India</p>
              </div>
            </div>

            {/* Need Help? */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <a href="/help" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  📚 Browse Help Center
                </a>
                <a href="/community" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  💬 Join Student Community
                </a>
                <a href="/tutorials" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  🎥 Watch Video Tutorials
                </a>
                <a href="/contact" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  ✉️ Contact Support
                </a>
              </div>
            </div>

            {/* Success Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Student Success</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">7,000+</div>
                  <div className="text-gray-600 text-sm">Students Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <div className="text-gray-600 text-sm">Time Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">4.9/5</div>
                  <div className="text-gray-600 text-sm">Student Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
