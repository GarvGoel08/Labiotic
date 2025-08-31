export default function Pricing() {
  const plans = [
    {
      name: 'Student',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for Indian students',
      features: [
        '15 lab reports per month',
        'DOCX & PDF export',
        'Indian university templates',
        'Email support',
        'AICTE standard formatting'
      ],
      buttonText: 'Start Free',
      popular: false,
      gradient: 'from-green-500 to-green-600'
    },
    {
      name: 'Pro',
      price: 'Free',
      period: 'forever',
      description: 'Best for individual researchers',
      features: [
        'Unlimited lab reports',
        'DOCX & PDF export',
        'Premium Indian templates',
        'Priority support',
        'Advanced AICTE formatting',
        'Custom university branding',
        'Data analysis insights',
        'Version history'
      ],
      buttonText: 'Start Free',
      popular: true,
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      name: 'Department',
      price: 'Free',
      period: 'forever',
      description: 'Ideal for university departments',
      features: [
        'Everything in Pro',
        'Department collaboration',
        'Shared university templates',
        'Admin dashboard',
        'Usage analytics',
        'API access',
        'White-label option',
        'Dedicated support'
      ],
      buttonText: 'Start Free',
      popular: false,
      gradient: 'from-purple-600 to-pink-600'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Free for All
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Students</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            All plans are completely free! Choose the features that fit your academic needs. Full support for Indian university standards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden border ${
                plan.popular ? 'border-blue-200 transform scale-105' : 'border-gray-200'
              } hover:shadow-2xl transition-all duration-300`}
            >
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}>
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Can I change plans anytime?</h4>
              <p className="text-gray-600 mb-6">
                Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately.
              </p>
              
              <h4 className="font-bold text-gray-900 mb-3">What file formats do you support?</h4>
              <p className="text-gray-600 mb-6">
                We generate reports in both DOCX (Microsoft Word) and PDF formats, optimized for Indian university submission requirements.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Is my data secure?</h4>
              <p className="text-gray-600 mb-6">
                Absolutely. We use enterprise-grade encryption and never store your lab data permanently. Your privacy is our priority.
              </p>
              
              <h4 className="font-bold text-gray-900 mb-3">Do you support Indian university formats?</h4>
              <p className="text-gray-600 mb-6">
                Yes! We support AICTE standards, UGC guidelines, and specific formats for DTU, NSUT, IIIT Delhi, and 50+ other Indian institutions.
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need something custom?</h3>
            <p className="text-blue-100 mb-6">
              For Indian universities and large institutions, we offer custom enterprise solutions with AICTE compliance and dedicated support.
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
