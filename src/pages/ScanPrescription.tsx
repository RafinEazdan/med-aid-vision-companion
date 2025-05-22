
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthenticatedLayout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Image, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Capacitor } from '@capacitor/core';
import { Camera as CapacitorCamera, CameraResultType, CameraSource } from '@capacitor/camera';

const ScanPrescription = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCapture = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        // Use native camera on mobile
        const image = await CapacitorCamera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera,
          width: 1080,
          promptLabelHeader: 'Take a photo of your prescription',
          promptLabelCancel: 'Cancel',
          promptLabelPhoto: 'From Gallery',
          promptLabelPicture: 'Take Photo',
        });
        
        if (image && image.dataUrl) {
          setCapturedImage(image.dataUrl);
        }
      } else {
        // Fallback to file input on web
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.capture = 'environment';
        
        fileInput.onchange = (e: any) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              setCapturedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        };
        
        fileInput.click();
      }
    } catch (error) {
      console.error('Camera error:', error);
      toast({
        title: "Camera Error",
        description: "There was an error accessing the camera. Please try again.",
        variant: "destructive",
      });
    }
  };

  const analyzePrescription = () => {
    setIsAnalyzing(true);
    
    // Simulate prescription analysis with a timeout
    toast({
      title: "Analyzing prescription",
      description: "Please wait while we process your image...",
    });
    
    setTimeout(() => {
      setIsAnalyzing(false);
      // Mock prescription data - in a real app this would come from an API
      const prescriptionData = {
        id: Date.now().toString(),
        image: capturedImage,
        date: new Date().toISOString(),
        medicines: [
          {
            name: "Amoxicillin",
            dosage: "500mg",
            frequency: "3 times daily",
            duration: "7 days",
            quantity: "21 tablets",
            notes: "Take with food",
            buyLink: "https://example.com/buy/amoxicillin",
          }
        ]
      };
      
      // Store in local storage for demo purposes
      const storedPrescriptions = localStorage.getItem('medAssistPrescriptions');
      const prescriptions = storedPrescriptions ? JSON.parse(storedPrescriptions) : [];
      prescriptions.push(prescriptionData);
      localStorage.setItem('medAssistPrescriptions', JSON.stringify(prescriptions));
      
      // Navigate to the details page
      navigate(`/prescription-details/${prescriptionData.id}`);
    }, 2500);
  };

  return (
    <AuthenticatedLayout>
      <div className="medical-container">
        <div className="py-6 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-medical-dark">Scan Prescription</h1>
            <p className="text-gray-500">Take a clear photo of your prescription</p>
          </div>

          <Card className="medical-card overflow-hidden">
            <CardContent className="p-0">
              {capturedImage ? (
                <div className="relative">
                  <img 
                    src={capturedImage} 
                    alt="Captured prescription" 
                    className="w-full h-auto" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Button 
                      variant="outline" 
                      className="bg-white hover:bg-white/90 text-medical-primary"
                      onClick={handleCapture}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Retake Photo
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 aspect-[3/4] flex flex-col items-center justify-center">
                  <Image className="h-16 w-16 text-gray-400 mb-3" />
                  <p className="text-gray-500">No image captured</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={handleCapture}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Take Photo
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col space-y-3">
            <Button 
              className="bg-medical-primary hover:bg-medical-primary/90 w-full"
              onClick={analyzePrescription}
              disabled={!capturedImage || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Analyze Prescription
                </>
              )}
            </Button>
            
            <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ScanPrescription;
