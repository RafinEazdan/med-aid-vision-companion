import React from 'react';
import { AuthenticatedLayout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { User, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const userInitials = user.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <AuthenticatedLayout>
      <div className="medical-container py-6 space-y-6">
        <h1 className="text-2xl font-bold text-medical-dark">My Profile</h1>

        <Card className="medical-card">
          <CardHeader className="text-center pb-2">
            <Avatar className="w-20 h-20 mx-auto">
              <AvatarFallback className="bg-medical-primary text-white text-xl">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 text-xl">{user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                <span className="font-medium text-right">Email:</span>
                <span>{user.email}</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                <span className="font-medium text-right">Account ID:</span>
                <span className="text-gray-500">{user.id}</span>
              </div>
            </div>
            
            <div className="mt-8 space-y-3">
              <Button 
                variant="outline" 
                className="w-full"
                disabled
              >
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>

              <Button 
                variant="outline" 
                className="w-full text-destructive hover:bg-destructive/10"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-gray-500">
          <p>MedAssist App v1.0</p>
          <p className="mt-1">&copy; 2025 MedAssist. All rights reserved.</p>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Profile;
