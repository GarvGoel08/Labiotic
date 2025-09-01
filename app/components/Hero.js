export default function Hero() {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mt-4 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            AI-Powered Lab Documentation
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Create Perfect{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Lab Files
            </span>{' '}
            with AI
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Transform your lab work with our AI that instantly generates professional lab files in both DOCX and PDF formats. 
            Perfect for Indian universities and research institutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a  href="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Creating Now
            </a>
            <button className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Demo Preview */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-4 text-sm text-gray-600 font-mono">Labiotic AI Lab Generator</div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Input Your Lab Data</h3>
                      <div className="text-sm text-blue-700">
                        • Experiment details<br />
                        • Measurements & results<br />
                        • Analysis requirements
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-purple-900 mb-2">AI Generated Files</h3>
                      <div className="flex space-x-2">
                        <div className="bg-white px-3 py-1 rounded border text-sm">📄 Lab_Report.docx</div>
                        <div className="bg-white px-3 py-1 rounded border text-sm">📄 Lab_Report.pdf</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16">
            <p className="text-gray-500 text-sm mb-6">Trusted by researchers and students at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="bg-gray-200 px-6 py-3 rounded text-gray-600 font-semibold">DTU</div>
              <div className="bg-gray-200 px-6 py-3 rounded text-gray-600 font-semibold">NSUT</div>
              <div className="bg-gray-200 px-6 py-3 rounded text-gray-600 font-semibold">IIIT Delhi</div>
              <div className="bg-gray-200 px-6 py-3 rounded text-gray-600 font-semibold">IGDTUW</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
