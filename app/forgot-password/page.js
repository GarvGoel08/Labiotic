'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setSubmitted(true);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Labiotic
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Forgot your password?</h2>
          <p className="mt-2 text-gray-600">
            {submitted ? 
              "We've sent you a reset link" : 
              "No worries! Enter your email and we'll send you a reset link"
            }
          </p>
        </div>

        {/* Form or Success Message */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
          {submitted ? (
            <div className="text-center">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Check your email</h3>
              <p className="text-gray-600 mb-6">
                {message}
              </p>
              <p className="text-sm text-gray-500 mb-6">
                If you don't see the email within a few minutes, check your spam folder.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                    setMessage('');
                    setError('');
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Send Another Email
                </button>
                <Link
                  href="/login"
                  className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-lg font-semibold transition-all duration-300"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
              >
                {loading ? 'Sending reset link...' : 'Send reset link'}
              </button>
            </form>
          )}

          {!submitted && (
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Remember your password?{' '}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Security Note */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">🔒 Security Note</h3>
          <p className="text-blue-700 text-sm">
            For security reasons, password reset links expire after 10 minutes. 
            If you don't reset your password within this time, you'll need to request a new link.
          </p>
        </div>
      </div>
    </div>
  );
}
