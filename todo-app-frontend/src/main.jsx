import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { registerSW } from 'virtual:pwa-register';

// Replace with your actual Google OAuth client ID
const GOOGLE_CLIENT_ID = "919135882382-s80c39mq8e28kbu7953ffr8n516d98b1.apps.googleusercontent.com";

// Register the service worker for PWA support
registerSW({
  onNeedRefresh() {
    console.log("🟡 New content is available; please refresh.");
  },
  onOfflineReady() {
    console.log("✅ App is ready to work offline.");
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
