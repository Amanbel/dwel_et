import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-body-md text-on-surface">
      <div className="max-w-md w-full space-y-8">
        {/* Logo Header */}
        <div className="flex flex-col items-center justify-center">
          <Link to="/" className="flex items-center gap-sm mb-md">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-display-lg text-display-lg font-bold">
              D
            </div>
            <span className="font-headline-md text-headline-md text-primary font-bold">dwell et</span>
          </Link>
          <h2 className="mt-2 text-center font-headline-md text-headline-md text-on-surface">
            Create your lab account
          </h2>
          <p className="mt-2 text-center font-body-sm text-body-sm text-on-surface-variant">
            Start tracking and enhancing your digital wellness today.
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-surface-container-lowest py-8 px-4 sm:px-10 shadow-sm border border-outline-variant rounded-xl">
          {error && (
            <div className="bg-error-container text-on-error-container p-sm rounded-lg mb-md text-xs font-body-sm border border-error/10">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="name"
              name="name"
              type="text"
              label="Full Name"
              icon="person"
              placeholder="Dr. Alex Researcher"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              icon="mail"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              icon="lock"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Terms Agreement */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary focus:ring-primary border-outline-variant rounded bg-surface-container-lowest"
                />
              </div>
              <div className="ml-3 text-xs leading-none">
                <label htmlFor="agree-terms" className="font-body-sm text-on-surface-variant">
                  I agree to the{' '}
                  <a href="#terms" className="text-primary font-semibold hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#privacy" className="text-primary font-semibold hover:underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
            </div>

            {/* Register Button */}
            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-sm"
                isLoading={loading}
              >
                Create Account
              </Button>
            </div>
          </form>

          {/* Create Account Link */}
          <div className="mt-6 text-center">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Already have an account?{' '}
              <Link className="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors duration-200" to="/login">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
