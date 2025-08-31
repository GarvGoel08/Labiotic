export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing and using Labiotic, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Academic Use Policy</h2>
            <p className="text-gray-700 mb-6">
              Labiotic is designed to assist students in creating well-formatted lab reports and documentation. Users must:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Use the service for legitimate academic purposes only</li>
              <li>Ensure all content generated is original or properly cited</li>
              <li>Comply with their institution's academic integrity policies</li>
              <li>Not share generated content that violates copyright or intellectual property rights</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. User Accounts</h2>
            <p className="text-gray-700 mb-6">
              To access certain features of the service, you may be required to create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and current information</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Service Availability</h2>
            <p className="text-gray-700 mb-6">
              While we strive to maintain high availability, Labiotic is provided on an "as is" basis. We do not guarantee:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Uninterrupted or error-free service</li>
              <li>Complete accuracy of generated content</li>
              <li>Compatibility with all devices or browsers</li>
              <li>Availability during maintenance periods</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Content and Data</h2>
            <p className="text-gray-700 mb-6">
              Users retain ownership of their input data and generated content. By using our service, you grant us:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Right to process your data to provide the service</li>
              <li>License to store and transmit your content as necessary</li>
              <li>Permission to use anonymized data for service improvement</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Prohibited Activities</h2>
            <p className="text-gray-700 mb-6">You may not use Labiotic to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Generate content that violates academic integrity policies</li>
              <li>Create misleading or fraudulent documentation</li>
              <li>Attempt to reverse engineer or hack the service</li>
              <li>Share account credentials or violate usage limits</li>
              <li>Upload malicious content or spam</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              Labiotic and its operators shall not be liable for any direct, indirect, incidental, special, 
              consequential, or exemplary damages resulting from your use of the service, including but not 
              limited to academic consequences or data loss.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Privacy and Data Protection</h2>
            <p className="text-gray-700 mb-6">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use 
              of the service, to understand our practices regarding data collection and use.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify these terms at any time. Changes will be posted on this page with 
              an updated revision date. Continued use of the service constitutes acceptance of modified terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Contact Information</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900">Labiotic Support</p>
              <p className="text-gray-700">Email: legal@labiotic.com</p>
              <p className="text-gray-700">Address: New Delhi, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
