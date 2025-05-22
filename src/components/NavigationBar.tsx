
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Pill, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export const NavigationBar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const navItems = [
    {
      label: 'Home',
      icon: <Home className="h-5 w-5" />,
      path: '/',
    },
    {
      label: 'Prescriptions',
      icon: <Pill className="h-5 w-5" />,
      path: '/prescriptions',
    },
    {
      label: 'Profile',
      icon: <User className="h-5 w-5" />,
      path: '/profile',
    },
  ];

  return (
    <div className="bg-white border-t border-gray-200 shadow-sm">
      <nav className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex flex-col items-center py-3 px-4 transition-colors",
              location.pathname === item.path
                ? "text-medical-primary"
                : "text-gray-500 hover:text-medical-primary"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
        {user && (
          <button
            onClick={logout}
            className="flex flex-col items-center py-3 px-4 text-gray-500 hover:text-medical-primary transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-xs mt-1">Logout</span>
          </button>
        )}
      </nav>
    </div>
  );
};
