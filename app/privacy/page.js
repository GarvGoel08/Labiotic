export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-6">
              At Labiotic, we are committed to protecting your privacy. We collect information to provide and improve our services:
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Personal Information</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Name and email address (for account creation)</li>
              <li>University/Institution name</li>
              <li>Course and academic level information</li>
              <li>Profile information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Usage Data</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Lab reports and documents you create</li>
              <li>Templates and formats you use</li>
              <li>Time and frequency of service usage</li>
              <li>Feature interactions and preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Technical Information</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Operating system details</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-6">We use collected information for:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>Service Provision:</strong> Creating and formatting your lab reports</li>
              <li><strong>Account Management:</strong> Maintaining your profile and preferences</li>
              <li><strong>Communication:</strong> Sending important updates and support messages</li>
              <li><strong>Improvement:</strong> Analyzing usage patterns to enhance our services</li>
              <li><strong>Security:</strong> Protecting against fraud and unauthorized access</li>
              <li><strong>Legal Compliance:</strong> Meeting regulatory requirements in India</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Data Storage and Security</h2>
            <p className="text-gray-700 mb-6">
              We implement robust security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Encryption in transit and at rest</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Secure data centers with backup systems</li>
              <li>Staff training on data protection practices</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-6">
              We do not sell your personal information. We may share data only in these circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>With Your Consent:</strong> When you explicitly authorize sharing</li>
              <li><strong>Service Providers:</strong> Trusted partners who help operate our service</li>
              <li><strong>Legal Requirements:</strong> When required by Indian law or court orders</li>
              <li><strong>Safety Purposes:</strong> To protect rights, property, or safety</li>
              <li><strong>Business Transfers:</strong> In case of merger or acquisition</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-6">You have several rights regarding your personal data:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>Access:</strong> Request copies of your personal data</li>
              <li><strong>Correction:</strong> Update inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request removal of your personal data</li>
              <li><strong>Portability:</strong> Export your data in a readable format</li>
              <li><strong>Restriction:</strong> Limit how we process your data</li>
              <li><strong>Objection:</strong> Opt-out of certain data processing activities</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-6">
              We use cookies and similar technologies to enhance your experience:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how you use our service</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and choices</li>
              <li><strong>Marketing Cookies:</strong> Show relevant content and advertisements</li>
            </ul>
            <p className="text-gray-700 mb-6">
              You can control cookie settings through your browser preferences or our cookie consent tool.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Data Retention</h2>
            <p className="text-gray-700 mb-6">
              We retain your data only as long as necessary for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Providing our services to you</li>
              <li>Meeting legal and regulatory requirements</li>
              <li>Resolving disputes and enforcing agreements</li>
              <li>Improving our services (in anonymized form)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. International Transfers</h2>
            <p className="text-gray-700 mb-6">
              Your data is primarily stored and processed in India. If we need to transfer data internationally, 
              we ensure adequate protection through appropriate safeguards and legal frameworks.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 mb-6">
              Our service is intended for students 18 years and older. We do not knowingly collect personal 
              information from children under 18. If you believe we have collected such information, please 
              contact us immediately.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Updates to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy periodically to reflect changes in our practices or legal 
              requirements. We will notify you of significant changes through email or prominent notice on our website.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have questions about this Privacy Policy or want to exercise your rights, contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900">Labiotic Privacy Team</p>
              <p className="text-gray-700">Email: privacy@labiotic.com</p>
              <p className="text-gray-700">Address: New Delhi, India</p>
              <p className="text-gray-700">Response Time: Within 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
