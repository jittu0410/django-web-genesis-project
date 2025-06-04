
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from './AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { signIn, signUp } = useAuthContext();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await signUp(email, password);
        
        if (error) {
          // Handle specific signup errors
          if (error.message.includes('User already registered')) {
            toast({
              title: "Account Already Exists",
              description: "This email is already registered. Please sign in instead.",
              variant: "destructive",
            });
            setIsSignUp(false);
          } else {
            toast({
              title: "Sign Up Error",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          // Show confirmation message for email verification
          setShowConfirmation(true);
          toast({
            title: "Account Created Successfully!",
            description: "Please check your email and click the confirmation link to complete your registration.",
          });
        }
      } else {
        const { error } = await signIn(email, password);
        
        if (error) {
          // Handle specific signin errors
          if (error.message.includes('Email not confirmed')) {
            toast({
              title: "Email Not Confirmed",
              description: "Please check your email and click the confirmation link before signing in. Check your spam folder if you don't see it.",
              variant: "destructive",
            });
            setShowConfirmation(true);
          } else if (error.message.includes('Invalid login credentials')) {
            toast({
              title: "Invalid Credentials",
              description: "Please check your email and password and try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Sign In Error",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Welcome Back!",
            description: "You've been signed in successfully.",
          });
          onClose();
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setShowConfirmation(false);
    setIsSignUp(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (showConfirmation) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Check Your Email</DialogTitle>
            <DialogDescription className="text-center">
              We've sent a confirmation link to your email address.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center space-y-4">
            <Mail className="w-16 h-16 mx-auto text-purple-500" />
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                We sent a confirmation email to:
              </p>
              <p className="font-medium">{email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Click the link in the email to activate your account.
              </p>
              <p className="text-xs text-gray-500">
                Don't see the email? Check your spam folder.
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmation(false)}
                className="flex-1"
              >
                Back to Sign In
              </Button>
              <Button 
                onClick={handleClose}
                className="flex-1"
              >
                Got It
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isSignUp ? 'Create Account' : 'Sign In'}</DialogTitle>
          <DialogDescription>
            {isSignUp 
              ? 'Create a new account to start analyzing your resume'
              : 'Sign in to your account to continue'
            }
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength={6}
            />
            {isSignUp && (
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 6 characters long
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setShowConfirmation(false);
            }}
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
