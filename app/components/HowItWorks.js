export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: 'Input Your Data',
      description: 'Upload your experimental data, measurements, or simply describe your lab work in natural language.',
      icon: '📝',
      color: 'blue'
    },
    {
      step: 2,
      title: 'AI Processing',
      description: 'Our advanced AI analyzes your data and creates a structured, professional lab report following academic standards.',
      icon: '🧠',
      color: 'purple'
    },
    {
      step: 3,
      title: 'Download Files',
      description: 'Get your perfectly formatted lab report in both DOCX and PDF formats, ready for submission.',
      icon: '⬇️',
      color: 'green'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your lab work into professional documentation in just three simple steps
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-32 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <svg className="w-full h-4" viewBox="0 0 800 40">
              <path 
                d="M200 20 L600 20" 
                stroke="url(#gradient1)" 
                strokeWidth="3" 
                strokeDasharray="10,5"
                fill="none"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  {/* Step Number */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${
                    step.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    step.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    'from-green-500 to-green-600'
                  } flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="text-5xl mb-6">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Demo Section */}
        <div className="mt-20 bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white text-center">
              See It In Action
            </h3>
            <p className="text-blue-100 text-center mt-2">
              Watch how Labiotic transforms raw data into professional lab reports
            </p>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Input */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center mr-2">1</span>
                  Raw Input
                </h4>
                <div className="bg-white p-4 rounded-lg border text-sm text-gray-700">
                  <div className="font-mono text-xs">
                    Experiment: pH analysis of soil samples<br />
                    Sample A: pH 6.2<br />
                    Sample B: pH 7.1<br />
                    Sample C: pH 5.8<br />
                    Temperature: 25°C<br />
                    Method: Digital pH meter
                  </div>
                </div>
              </div>

              {/* Processing */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <div className="animate-spin">⚡</div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Processing</h4>
                <p className="text-sm text-gray-600">Analyzing structure and formatting...</p>
              </div>

              {/* Output */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mr-2">3</span>
                  Generated Report
                </h4>
                <div className="bg-white p-4 rounded-lg border text-sm">
                  <div className="font-semibold text-gray-900 mb-2">Soil pH Analysis Report</div>
                  <div className="text-gray-700 text-xs space-y-1">
                    <div>• Abstract & Introduction ✓</div>
                    <div>• Materials & Methods ✓</div>
                    <div>• Results & Analysis ✓</div>
                    <div>• Statistical Analysis ✓</div>
                    <div>• Conclusions ✓</div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">📄 DOCX</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">📄 PDF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a href="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Try It Now - It's Free
          </a>
        </div>
      </div>
    </section>
  );
}
