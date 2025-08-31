export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Main CTA Content */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Transform Your
              <br />
              <span className="text-yellow-300">Academic Workflow?</span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of Indian students and researchers who have revolutionized their documentation process. 
              Start creating professional lab reports in seconds, not hours.
            </p>
          </div>

          {/* Value Proposition Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-white font-bold text-lg mb-2">Instant Results</h3>
              <p className="text-blue-100 text-sm">Generate reports in under 30 seconds</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-white font-bold text-lg mb-2">Perfect Quality</h3>
              <p className="text-blue-100 text-sm">Professional formatting every time</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">🇮🇳</div>
              <h3 className="text-white font-bold text-lg mb-2">Made for India</h3>
              <p className="text-blue-100 text-sm">Supports AICTE & UGC standards</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Creating Now - ₹99/month
            </button>
            <button className="border-2 border-white/50 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              Watch 2-Minute Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-blue-100">
            <div className="flex items-center">
              <span className="text-2xl mr-2">✓</span>
              <span>No setup required</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">✓</span>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">✓</span>
              <span>30-day money-back guarantee</span>
            </div>
          </div>

          {/* Urgency Element */}
          <div className="mt-12 bg-yellow-400/20 border border-yellow-300/30 rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl mr-3">�</span>
              <h3 className="text-yellow-300 font-bold text-xl">Student Launch Offer</h3>
            </div>
            <p className="text-white text-lg mb-4">
              Get 50% off on your first 3 months when you sign up this week!
            </p>
            <div className="text-yellow-300 font-semibold">
              Special launch offer for Indian students: <span className="bg-yellow-400/30 px-3 py-1 rounded-lg">Limited time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,120 L0,60 C200,20 400,80 600,60 C800,40 1000,100 1200,60 L1200,120 Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
