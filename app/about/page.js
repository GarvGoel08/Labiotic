export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Labiotic
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Empowering Indian students with AI-powered lab file generation
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              We believe that every student deserves to focus on learning rather than spending countless hours on 
              formatting lab reports. Labiotic was born from the frustration of engineering students who were losing 
              precious study time to repetitive documentation tasks.
            </p>
            <p className="text-lg text-gray-700">
              Our mission is to democratize access to professional-quality lab documentation tools for Indian students, 
              ensuring that academic excellence isn't hindered by formatting challenges.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">7,000+</div>
                <div className="text-gray-600">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-gray-600">Universities Supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">100,000+</div>
                <div className="text-gray-600">Lab Reports Generated</div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              Labiotic was founded in 2024 by a team of engineering graduates from DTU and NSUT who experienced 
              firsthand the challenges of academic documentation. After spending countless nights formatting lab 
              reports instead of studying for exams, they realized there had to be a better way.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              What started as a simple idea to automate lab report formatting has evolved into a comprehensive 
              platform that serves thousands of students across India. We've partnered with universities, 
              professors, and students to ensure our templates meet the highest academic standards.
            </p>
            <p className="text-lg text-gray-700">
              Today, Labiotic is proud to support students from over 50 universities across India, helping them 
              save time, reduce stress, and focus on what truly matters - learning and innovation.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Student-First</h3>
              <p className="text-gray-600">
                Every decision we make is guided by what's best for students. We listen, adapt, and improve based on your feedback.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Simplicity</h3>
              <p className="text-gray-600">
                Complex problems deserve simple solutions. We make advanced AI accessible to everyone, regardless of technical expertise.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">
                We promote academic integrity by helping with formatting and structure, never with content that violates academic ethics.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet the Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">GG</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Garv Goel</h3>
              <p className="text-gray-600 mb-2">Founder & CEO</p>
              <p className="text-gray-500 text-sm">B.Tech EE, DTU</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-8">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Us
            </a>
            <a 
              href="/careers" 
              className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Join Our Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
