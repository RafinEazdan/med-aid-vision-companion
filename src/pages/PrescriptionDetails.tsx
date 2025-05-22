
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthenticatedLayout } from '@/components/Layout';
import { Pill, ShoppingCart, ArrowLeft, Calendar } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: string;
  notes: string;
  buyLink: string;
}

interface Prescription {
  id: string;
  image: string;
  date: string;
  medicines: Medicine[];
}

const PrescriptionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch prescription details from localStorage (in a real app, this would be an API call)
    const fetchPrescription = () => {
      const storedPrescriptions = localStorage.getItem('medAssistPrescriptions');
      if (storedPrescriptions) {
        const prescriptions: Prescription[] = JSON.parse(storedPrescriptions);
        const found = prescriptions.find(p => p.id === id);
        if (found) {
          setPrescription(found);
        }
      }
      setLoading(false);
    };
    
    fetchPrescription();
  }, [id]);

  if (loading) {
    return (
      <AuthenticatedLayout>
        <div className="flex justify-center items-center h-full">
          <Spinner size="lg" />
        </div>
      </AuthenticatedLayout>
    );
  }

  if (!prescription) {
    return (
      <AuthenticatedLayout>
        <div className="medical-container py-8 text-center">
          <h1 className="text-2xl font-bold text-medical-dark">Prescription Not Found</h1>
          <p className="text-gray-500 mt-2">The requested prescription could not be found</p>
          <Button 
            className="mt-6 bg-medical-primary hover:bg-medical-primary/90"
            onClick={() => navigate('/prescriptions')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Prescriptions
          </Button>
        </div>
      </AuthenticatedLayout>
    );
  }

  const formattedDate = new Date(prescription.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <AuthenticatedLayout>
      <div className="medical-container py-6 space-y-6">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/prescriptions')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-medical-dark">Prescription Details</h1>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        {prescription.image && (
          <Card className="medical-card overflow-hidden">
            <CardContent className="p-0">
              <img 
                src={prescription.image} 
                alt="Prescription" 
                className="w-full h-auto" 
              />
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-medical-dark">Prescribed Medications</h2>
          
          {prescription.medicines.map((medicine, index) => (
            <Card key={index} className="medical-card">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-medical-primary flex items-center">
                    <Pill className="h-5 w-5 mr-2" />
                    {medicine.name}
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-medical-accent border-medical-accent hover:bg-medical-accent hover:text-white"
                    onClick={() => window.open(medicine.buyLink, '_blank')}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Buy Now
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Dosage</p>
                    <p className="font-medium">{medicine.dosage}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Frequency</p>
                    <p className="font-medium">{medicine.frequency}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">{medicine.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Quantity</p>
                    <p className="font-medium">{medicine.quantity}</p>
                  </div>
                </div>
                {medicine.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-gray-500 text-sm">Notes</p>
                    <p className="text-sm">{medicine.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default PrescriptionDetails;
