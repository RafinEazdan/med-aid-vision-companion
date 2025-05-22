
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { AuthenticatedLayout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <AuthenticatedLayout>
      <div className="medical-container">
        <div className="py-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-medical-dark">Welcome, {user.name}</h1>
            <p className="text-gray-500 mt-1">Your MedAssist Dashboard</p>
          </div>

          <Card className="medical-card bg-gradient-to-r from-medical-primary to-medical-secondary">
            <CardContent className="pt-6">
              <div className="text-white text-center p-4">
                <h2 className="text-xl font-semibold">Scan Your Prescription</h2>
                <p className="mt-2">Take a photo of your prescription to get started</p>
                <Button 
                  variant="outline" 
                  className="mt-4 bg-white hover:bg-white/90 text-medical-primary"
                  asChild
                >
                  <Link to="/scan">
                    <Camera className="mr-2 h-5 w-5" />
                    Scan Prescription
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="medical-card">
              <CardContent className="p-4 text-center">
                <div className="bg-medical-light rounded-full w-12 h-12 mx-auto flex items-center justify-center mb-3">
                  <Pill className="h-6 w-6 text-medical-primary" />
                </div>
                <h3 className="font-medium">My Prescriptions</h3>
                <p className="text-xs text-gray-500 mt-1">View your history</p>
                <Button variant="ghost" size="sm" className="w-full mt-2" asChild>
                  <Link to="/prescriptions">View All</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="medical-card">
              <CardContent className="p-4 text-center">
                <div className="bg-medical-light rounded-full w-12 h-12 mx-auto flex items-center justify-center mb-3">
                  <User className="h-6 w-6 text-medical-primary" />
                </div>
                <h3 className="font-medium">My Profile</h3>
                <p className="text-xs text-gray-500 mt-1">Account settings</p>
                <Button variant="ghost" size="sm" className="w-full mt-2" asChild>
                  <Link to="/profile">Settings</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
