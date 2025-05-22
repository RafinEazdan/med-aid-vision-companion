
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d9ac82711f0344c9ae46022ad2b2b908',
  appName: 'med-aid-vision-companion',
  webDir: 'dist',
  server: {
    url: "https://d9ac8271-1f03-44c9-ae46-022ad2b2b908.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3B82F6",
      showSpinner: true,
      spinnerColor: "#ffffff"
    }
  }
};

export default config;
