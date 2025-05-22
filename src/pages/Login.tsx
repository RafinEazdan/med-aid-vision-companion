
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/Layout';
import { Spinner } from '@/components/ui/spinner';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      // Error is handled in the AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="medical-container flex flex-col justify-center py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-medical-dark">MedAssist</h1>
          <p className="text-medical-primary mt-2">Your Prescription Assistant</p>
        </div>
        
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your MedAssist account
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-medical-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-3">
              <Button 
                type="submit" 
                className="w-full bg-medical-primary hover:bg-medical-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner size="sm" className="mr-2 border-white" /> : null}
                Sign In
              </Button>
              
              <p className="text-center text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-medical-primary hover:underline font-medium">
                  Sign Up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Demo credentials: demo@example.com / password
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
