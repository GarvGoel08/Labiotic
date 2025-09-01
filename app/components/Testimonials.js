'use client';

import { useState } from 'react';

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Research Scholar',
      institution: 'DTU Delhi',
      image: '👩‍🔬',
      quote: 'Labiotic has revolutionized how I create lab reports for my PhD research. What used to take me 8 hours now takes 15 minutes. Perfect for Indian academic standards!',
      rating: 5,
      highlight: 'Saved 8 hours per report'
    },
    {
      name: 'Prof. Rajesh Kumar',
      role: 'Electronics Department Head',
      institution: 'NSUT Delhi',
      image: '👨‍🔬',
      quote: 'I\'ve been using Labiotic for my entire department. The consistency and quality of reports has improved dramatically. My students love how easy it is to use.',
      rating: 5,
      highlight: 'Improved department productivity by 300%'
    },
    {
      name: 'Dr. Neha Gupta',
      role: 'Assistant Professor',
      institution: 'IIIT Delhi',
      image: '👩‍💼',
      quote: 'The AI-generated formatting follows AICTE standards perfectly. It handles Indian citation formats and university templates beautifully.',
      rating: 5,
      highlight: 'Perfect AICTE formatting every time'
    },
    {
      name: 'Arjun Singh',
      role: 'B.Tech Student',
      institution: 'IGDTUW Delhi',
      image: '👨‍🎓',
      quote: 'As a final year student, Labiotic has been a lifesaver for my project reports. The AI understands Indian lab report formats perfectly.',
      rating: 5,
      highlight: 'Perfect for student projects'
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Leading
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Researchers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what students and researchers from top Delhi institutions are saying about Labiotic
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden mb-16">
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Testimonial Content */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="text-6xl mr-4">{testimonials[activeTestimonial].image}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{testimonials[activeTestimonial].name}</h3>
                    <p className="text-blue-600 font-medium">{testimonials[activeTestimonial].role}</p>
                    <p className="text-gray-600">{testimonials[activeTestimonial].institution}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonials[activeTestimonial].quote}"
                </blockquote>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Key Impact:</div>
                  <div className="font-semibold text-blue-600">{testimonials[activeTestimonial].highlight}</div>
                </div>
              </div>

              {/* Visual Element */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📊</div>
                    <h4 className="font-bold text-gray-900 mb-2">Impact Metrics</h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">95%</div>
                        <div className="text-sm text-gray-600">Time Saved</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">99%</div>
                        <div className="text-sm text-gray-600">Accuracy</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">4.9</div>
                        <div className="text-sm text-gray-600">User Rating</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">24/7</div>
                        <div className="text-sm text-gray-600">Available</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <button 
              onClick={prevTestimonial}
              className="bg-white/80 hover:bg-white text-gray-600 hover:text-blue-600 p-3 rounded-full shadow-lg transition-all duration-300"
            >
              ←
            </button>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <button 
              onClick={nextTestimonial}
              className="bg-white/80 hover:bg-white text-gray-600 hover:text-blue-600 p-3 rounded-full shadow-lg transition-all duration-300"
            >
              →
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 p-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{testimonial.image}</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                  <p className="text-blue-600 text-xs">{testimonial.institution}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                "{testimonial.quote.substring(0, 120)}..."
              </p>
              <div className="flex mt-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="text-center">
          <p className="text-gray-600 mb-8">Trusted by students and faculty at 50+ Indian institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 mb-12">
            <div className="bg-white px-6 py-3 rounded-lg shadow text-gray-600 font-semibold">DTU</div>
            <div className="bg-white px-6 py-3 rounded-lg shadow text-gray-600 font-semibold">NSUT</div>
            <div className="bg-white px-6 py-3 rounded-lg shadow text-gray-600 font-semibold">IIIT Delhi</div>
            <div className="bg-white px-6 py-3 rounded-lg shadow text-gray-600 font-semibold">IGDTUW</div>
            <div className="bg-white px-6 py-3 rounded-lg shadow text-gray-600 font-semibold">JMI</div>
          </div>
          
          <a href="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Join These Students & Researchers
          </a>
        </div>
      </div>
    </section>
  );
}
