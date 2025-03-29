import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { setAccessToken } from '@/lib/sheets-api';

interface GoogleAuthProps {
  onAuthSuccess?: () => void;
  onAuthFailure?: (error: Error) => void;
}

export function GoogleAuth({ onAuthSuccess, onAuthFailure }: GoogleAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

  useEffect(() => {
    // Cargamos el script de Google API dinámicamente
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = initializeGAPI;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeGAPI = () => {
    // @ts-ignore - gapi está disponible globalmente después de cargar el script
    window.gapi.load('client:auth2', () => {
      // @ts-ignore
      window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      }).then(() => {
        // @ts-ignore
        const authInstance = window.gapi.auth2.getAuthInstance();
        
        // Verificamos si el usuario ya está autenticado
        if (authInstance.isSignedIn.get()) {
          handleAuthSuccess(authInstance.currentUser.get());
        }
        
        setIsInitializing(false);
      }).catch((error: Error) => {
        console.error('Error al inicializar GAPI:', error);
        setError('Error al inicializar la API de Google');
        setIsInitializing(false);
        if (onAuthFailure) onAuthFailure(error);
      });
    });
  };

  const handleAuthSuccess = (googleUser: any) => {
    const token = googleUser.getAuthResponse().access_token;
    setAccessToken(token);
    setIsAuthenticated(true);
    setError(null);
    if (onAuthSuccess) onAuthSuccess();
  };

  const handleAuthClick = () => {
    if (isInitializing) return;
    
    try {
      // @ts-ignore
      const authInstance = window.gapi.auth2.getAuthInstance();
      
      if (!authInstance.isSignedIn.get()) {
        authInstance.signIn().then(handleAuthSuccess).catch((error: Error) => {
          console.error('Error de autenticación:', error);
          setError('Error al autenticar con Google');
          if (onAuthFailure) onAuthFailure(error);
        });
      }
    } catch (error: any) {
      console.error('Error al autenticar:', error);
      setError(`Error: ${error.message}`);
      if (onAuthFailure && error instanceof Error) onAuthFailure(error);
    }
  };

  const handleSignOut = () => {
    try {
      // @ts-ignore
      const authInstance = window.gapi.auth2.getAuthInstance();
      authInstance.signOut().then(() => {
        setIsAuthenticated(false);
        setError(null);
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (isInitializing) {
    return <div>Cargando autenticación de Google...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      
      {!isAuthenticated ? (
        <Button 
          onClick={handleAuthClick} 
          variant="outline"
          className="flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
            <path fill="none" d="M1 1h22v22H1z" />
          </svg>
          Iniciar sesión con Google
        </Button>
      ) : (
        <Button onClick={handleSignOut} variant="outline">
          Cerrar sesión
        </Button>
      )}
    </div>
  );
}