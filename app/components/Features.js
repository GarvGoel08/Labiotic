export default function Features() {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Generation',
      description: 'Advanced AI algorithms understand your lab data and generate professional documentation automatically.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: '📄',
      title: 'Dual Format Export',
      description: 'Get your lab files in both DOCX and PDF formats, ready for submission or sharing.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Generate complete lab reports in seconds, not hours. Focus on science, not formatting.',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: '🎯',
      title: 'Precision Formatting',
      description: 'Perfect formatting every time, following academic standards and institutional requirements.',
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. We never store or share your laboratory information.',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: '📊',
      title: 'Smart Analysis',
      description: 'AI analyzes your data patterns and suggests improvements for better lab documentation.',
      gradient: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Modern Labs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create professional lab documentation with the power of AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Professional Quality,
                <span className="text-blue-600"> Every Time</span>
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Our AI has been trained on thousands of lab reports from top Indian institutions. 
                Get formatting and structure that meets Indian academic standards and university requirements.
              </p>                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">AICTE and UGC formatting support</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Automatic citation generation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">University template support</span>
                  </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="bg-gray-100 p-3 rounded-lg mb-4 text-sm font-mono">
                <div className="text-blue-600 mb-1">// Sample AI-generated structure</div>
                <div className="text-gray-700">
                  1. Abstract<br />
                  2. Introduction<br />
                  3. Materials & Methods<br />
                  4. Results & Analysis<br />
                  5. Discussion<br />
                  6. Conclusions<br />
                  7. References
                </div>
              </div>
              <div className="text-sm text-gray-600">
                ✓ Generated in 3.2 seconds
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
