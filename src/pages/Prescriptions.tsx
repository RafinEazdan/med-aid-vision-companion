
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticatedLayout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill, Calendar, Plus } from 'lucide-react';

interface Medicine {
  name: string;
}

interface Prescription {
  id: string;
  image: string;
  date: string;
  medicines: Medicine[];
}

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  
  useEffect(() => {
    // Fetch prescriptions from localStorage (in a real app, this would be an API call)
    const storedPrescriptions = localStorage.getItem('medAssistPrescriptions');
    if (storedPrescriptions) {
      setPrescriptions(JSON.parse(storedPrescriptions));
    }
  }, []);

  return (
    <AuthenticatedLayout>
      <div className="medical-container py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-medical-dark">My Prescriptions</h1>
          <Button 
            size="sm" 
            className="bg-medical-primary hover:bg-medical-primary/90"
            asChild
          >
            <Link to="/scan">
              <Plus className="h-4 w-4 mr-1" />
              New Scan
            </Link>
          </Button>
        </div>
        
        {prescriptions.length > 0 ? (
          <div className="space-y-4">
            {prescriptions.map((prescription) => {
              const formattedDate = new Date(prescription.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
              
              return (
                <Link key={prescription.id} to={`/prescription-details/${prescription.id}`}>
                  <Card className="medical-card hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-3.5 w-3.5 mr-1.5" />
                          <span>{formattedDate}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center">
                        <div className="bg-medical-light rounded-md h-12 w-12 flex items-center justify-center mr-3">
                          <Pill className="h-6 w-6 text-medical-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base font-medium text-medical-dark">
                            {prescription.medicines.map(m => m.name).join(", ")}
                          </CardTitle>
                          <p className="text-sm text-gray-500">
                            {prescription.medicines.length} medication{prescription.medicines.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-medical-light rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <Pill className="h-8 w-8 text-medical-primary" />
            </div>
            <h2 className="text-xl font-medium text-medical-dark">No prescriptions yet</h2>
            <p className="text-gray-500 mt-1 mb-6">Scan your first prescription to get started</p>
            <Button 
              className="bg-medical-primary hover:bg-medical-primary/90"
              asChild
            >
              <Link to="/scan">
                <Plus className="h-4 w-4 mr-2" />
                Scan Prescription
              </Link>
            </Button>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
};

export default Prescriptions;
