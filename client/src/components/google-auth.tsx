import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { setAccessToken } from '@/lib/sheets-api';

interface GoogleAuthProps {
  onAuthSuccess?: () => void;
  onAuthFailure?: (error: Error) => void;
}

// Interfaz para la API de Google
declare global {
  interface Window {
    gapi: any;
    google: any;
    googleAuthInitialized: boolean;
  }
}

export function GoogleAuth({ onAuthSuccess, onAuthFailure }: GoogleAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

  useEffect(() => {
    // Método moderno: Cargar gapi.client.js usando window.google
    const loadGapiAndInitialize = () => {
      // Cargamos la librería principal de Google
      const scriptGSI = document.createElement('script');
      scriptGSI.src = 'https://accounts.google.com/gsi/client';
      scriptGSI.async = true;
      scriptGSI.defer = true;
      scriptGSI.onload = () => {
        // Ahora cargamos la biblioteca gapi
        const scriptGAPI = document.createElement('script');
        scriptGAPI.src = 'https://apis.google.com/js/api.js';
        scriptGAPI.async = true;
        scriptGAPI.defer = true;
        scriptGAPI.onload = initializeGoogle;
        document.head.appendChild(scriptGAPI);
      };
      document.head.appendChild(scriptGSI);
    };

    loadGapiAndInitialize();

    return () => {
      // La limpieza de scripts es complicada, se maneja el ciclo de vida a través
      // de variables globales para evitar múltiples inicializaciones
    };
  }, []);

  const initializeGoogle = () => {
    if (window.googleAuthInitialized) {
      checkAuthStatus();
      return;
    }

    window.gapi.load('client', async () => {
      try {
        await window.gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        });

        window.googleAuthInitialized = true;
        checkAuthStatus();
      } catch (error: any) {
        console.error('Error al inicializar GAPI client:', error);
        handleAuthError(error);
      }
    });
  };

  const checkAuthStatus = () => {
    try {
      // Comprobamos si hay un token en localStorage
      const token = localStorage.getItem('googleAuthToken');
      const tokenExpiry = localStorage.getItem('googleAuthTokenExpiry');
      
      if (token && tokenExpiry && Number(tokenExpiry) > Date.now()) {
        // Token válido, lo usamos
        setAccessToken(token);
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error al verificar estado de autenticación:', error);
      setIsLoading(false);
    }
  };

  const handleAuthClick = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse: any) => {
          if (tokenResponse && tokenResponse.access_token) {
            // Éxito en la autenticación
            const token = tokenResponse.access_token;
            const expiresIn = tokenResponse.expires_in || 3600; // Default a 1 hora
            
            // Calculamos el tiempo de expiración
            const expiryTime = Date.now() + (expiresIn * 1000);
            
            // Guardamos el token y su tiempo de expiración
            localStorage.setItem('googleAuthToken', token);
            localStorage.setItem('googleAuthTokenExpiry', expiryTime.toString());
            
            setAccessToken(token);
            setIsAuthenticated(true);
            setError(null);
            setIsLoading(false);
            
            if (onAuthSuccess) onAuthSuccess();
          } else {
            // No hay token
            setIsLoading(false);
            handleAuthError(new Error('No se recibió un token válido'));
          }
        },
        error_callback: (err: any) => {
          setIsLoading(false);
          handleAuthError(err);
        }
      });

      tokenClient.requestAccessToken();
    } catch (error: any) {
      setIsLoading(false);
      handleAuthError(error);
    }
  };

  const handleAuthError = (error: any) => {
    console.error('Error de autenticación con Google:', error);
    
    let message = 'Error durante la autenticación con Google';
    
    if (error?.message) {
      if (error.message.includes('Not a valid origin')) {
        message = 'El dominio actual no está autorizado en la consola de Google Cloud. Configura los orígenes JavaScript autorizados.';
      } else if (error.message.includes('popup_closed_by_user')) {
        message = 'Ventana cerrada. Por favor, intenta nuevamente.';
      } else {
        message = error.message;
      }
    }
    
    setError(message);
    if (onAuthFailure) onAuthFailure(new Error(message));
  };

  const handleSignOut = () => {
    try {
      // Eliminamos los datos de autenticación
      localStorage.removeItem('googleAuthToken');
      localStorage.removeItem('googleAuthTokenExpiry');
      
      setIsAuthenticated(false);
      setError(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-2">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
    </div>;
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {error && <div className="text-red-500 mb-2 text-sm text-center">{error}</div>}
      
      {!isAuthenticated ? (
        <Button 
          onClick={handleAuthClick} 
          variant="outline"
          className="flex items-center gap-2"
          disabled={isLoading}
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