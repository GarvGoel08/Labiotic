export default function Benefits() {
  const benefits = [
    {
      title: 'Save 8+ Hours Per Assignment',
      description: 'Eliminate tedious formatting and focus on your studies. What used to take hours now takes minutes.',
      icon: '⏰',
      stat: '95%',
      statLabel: 'Time Reduction'
    },
    {
      title: 'Perfect Formatting Every Time',
      description: 'No more worrying about margins, citations, or structure. AI ensures professional quality for coursework.',
      icon: '✨',
      stat: '100%',
      statLabel: 'Format Accuracy'
    },
    {
      title: 'Zero Learning Curve',
      description: 'Intuitive interface that students love. Start creating professional lab reports immediately.',
      icon: '🚀',
      stat: '4.9/5',
      statLabel: 'Student Rating'
    }
  ];

  const comparisonData = [
    {
      task: 'Data Structures Lab Report',
      traditional: '4-5 hours',
      labiotic: '15 minutes',
      improvement: '95%'
    },
    {
      task: 'Database Management Lab',
      traditional: '3-4 hours',
      labiotic: '12 minutes',
      improvement: '94%'
    },
    {
      task: 'Software Engineering Project',
      traditional: '6-8 hours',
      labiotic: '20 minutes',
      improvement: '96%'
    },
    {
      task: 'Computer Networks Lab',
      traditional: '3-5 hours',
      labiotic: '10 minutes',
      improvement: '97%'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Students Choose
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Labiotic</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of students from DTU, NSUT, IIIT Delhi, and other top Indian universities who have revolutionized their coursework with AI-powered lab file generation
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300">
              <div className="text-6xl mb-6">{benefit.icon}</div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{benefit.stat}</div>
              <div className="text-sm text-gray-500 mb-4">{benefit.statLabel}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Before/After Comparison */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Traditional Method vs. Labiotic
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Task</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-600">Traditional Method</th>
                  <th className="text-center py-4 px-4 font-semibold text-blue-600">With Labiotic</th>
                  <th className="text-center py-4 px-4 font-semibold text-green-600">Improvement</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-white/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-900">{row.task}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{row.traditional}</td>
                    <td className="py-4 px-4 text-center text-blue-600 font-semibold">{row.labiotic}</td>
                    <td className="py-4 px-4 text-center text-green-600 font-bold">{row.improvement} faster</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white text-center">
              Calculate Your Time Savings
            </h3>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6">Your Monthly Savings</h4>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Lab reports per month:</span>
                      <span className="font-bold text-blue-600">12 reports</span>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Time saved per report:</span>
                      <span className="font-bold text-purple-600">8 hours</span>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Total monthly savings:</span>
                      <span className="font-bold text-green-600 text-2xl">96 hours</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-100 to-blue-100 p-8 rounded-2xl">
                  <div className="text-6xl mb-4">🎯</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">96+ Hours</div>
                  <div className="text-lg text-gray-600 mb-4">Saved Every Month</div>
                  <div className="text-sm text-gray-500">
                    That's 2.5 full work weeks you can dedicate to actual research and studies!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-16">            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-blue-600">75,000+</div>
                <div className="text-gray-600">Lab Reports Generated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">8,500+</div>
                <div className="text-gray-600">Happy Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">99.9%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Start Saving Time Today
          </button>
        </div>
      </div>
    </section>
  );
}
