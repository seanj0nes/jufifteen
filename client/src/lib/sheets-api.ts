import { type InsertRsvp } from "@shared/schema";

// La función que formatea el valor booleano para la hoja
function formatBoolean(value: boolean | null | undefined): string {
  return value === true ? 'Sí' : 'No';
}

// Estas claves estarán disponibles en el frontend a través de import.meta.env
const SHEETS_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SHEETS_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID;

export async function appendToSheet(rsvp: InsertRsvp): Promise<void> {
  try {
    // Preparamos los datos para Google Sheets en el formato esperado
    const values = [
      [
        rsvp.name,
        rsvp.email,
        formatBoolean(rsvp.attending),
        rsvp.dietaryRestrictions || '',
        formatBoolean(rsvp.usesBus),
        rsvp.dni || '',
        rsvp.message || '',
        new Date().toLocaleString('es-AR'),
      ],
    ];

    // URL para la API de Google Sheets v4
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/A:H:append?valueInputOption=USER_ENTERED&key=${SHEETS_API_KEY}`;
    
    // Hacemos la solicitud POST a la API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error al guardar en Google Sheets: ${error.error?.message || 'Error desconocido'}`);
    }

    console.log(`RSVP guardado exitosamente en Google Sheets para ${rsvp.name}`);
    
  } catch (error: any) {
    console.error('Error al guardar en Google Sheets:', error);
    throw error;
  }
}

// Alternativa usando OAuth2 y Google Identity Services (más seguro)
let accessToken: string | null = null;

// Función para almacenar el token de acceso
export function setAccessToken(token: string): void {
  accessToken = token;
}

// Función para enviar datos a Google Sheets usando OAuth
export async function appendToSheetWithOAuth(rsvp: InsertRsvp): Promise<void> {
  if (!accessToken) {
    throw new Error('No hay un token de acceso disponible. Por favor, inicia sesión primero.');
  }

  try {
    // Preparamos los datos para Google Sheets
    const values = [
      [
        rsvp.name,
        rsvp.email,
        formatBoolean(rsvp.attending),
        rsvp.dietaryRestrictions || '',
        formatBoolean(rsvp.usesBus),
        rsvp.dni || '',
        rsvp.message || '',
        new Date().toLocaleString('es-AR'),
      ],
    ];

    // URL para la API de Google Sheets v4
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/A:H:append?valueInputOption=USER_ENTERED`;
    
    // Hacemos la solicitud POST a la API con el token de autenticación
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error al guardar en Google Sheets: ${error.error?.message || 'Error desconocido'}`);
    }

    console.log(`RSVP guardado exitosamente en Google Sheets para ${rsvp.name}`);
    
  } catch (error: any) {
    console.error('Error al guardar en Google Sheets:', error);
    throw error;
  }
}