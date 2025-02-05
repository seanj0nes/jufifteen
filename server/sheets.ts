import { google } from 'googleapis';
import { type InsertRsvp, type Rsvp } from '@shared/schema';
import { log } from './vite';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

function formatBoolean(value: boolean): string {
  return value ? 'Sí' : 'No';
}

export async function appendToSheet(rsvp: InsertRsvp): Promise<void> {
  try {
    // Primero verificamos que podemos acceder a la hoja
    await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const values = [
      [
        rsvp.name,
        rsvp.email,
        formatBoolean(rsvp.attending),
        rsvp.guests,
        rsvp.dietaryRestrictions || '',
        rsvp.message || '',
        new Date().toLocaleString('es-AR'),
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    log(`RSVP guardado en Google Sheets para ${rsvp.name}`);
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('No se pudo encontrar la hoja de Google Sheets. Por favor, verifica el ID y los permisos.');
    }
    if (error.response?.status === 403) {
      throw new Error('La cuenta de servicio no tiene permisos para acceder a la hoja. Asegúrate de compartir la hoja con el email de la cuenta de servicio.');
    }
    throw new Error(`Error al guardar en Google Sheets: ${error.message}`);
  }
}