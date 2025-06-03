
import React, { useState } from 'react';
import { useAuthContext } from './auth/AuthProvider';
import { AuthModal } from './auth/AuthModal';
import { Button } from './ui/button';
import { Lock } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
  const { user, loading } = useAuthContext();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        {fallback || (
          <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-white flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
              <Lock className="w-16 h-16 mx-auto mb-6 text-purple-400" />
              <h1 className="text-3xl font-bold mb-4">Authentication Required</h1>
              <p className="text-gray-300 mb-6">
                Please sign in to access this feature and start analyzing your resume.
              </p>
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl"
              >
                Sign In to Continue
              </Button>
            </div>
          </div>
        )}
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </>
    );
  }

  return <>{children}</>;
};
