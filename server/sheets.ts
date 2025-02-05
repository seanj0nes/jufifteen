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
    log(`Intentando conectar a Google Sheets con ID: ${spreadsheetId?.substring(0, 5)}...`);

    // Primero verificamos que podemos acceder a la hoja
    await sheets.spreadsheets.get({
      spreadsheetId,
    });

    log('Conexión exitosa a Google Sheets, procediendo a guardar datos');

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

    log(`RSVP guardado exitosamente en Google Sheets para ${rsvp.name}`);
  } catch (error: any) {
    if (error.response?.status === 404) {
      log('Error 404: Hoja de cálculo no encontrada');
      throw new Error('No se pudo encontrar la hoja de Google Sheets. Por favor, verifica el ID y asegúrate de que la hoja exista.');
    }
    if (error.response?.status === 403) {
      log('Error 403: Permisos insuficientes');
      throw new Error(`La cuenta de servicio (${process.env.GOOGLE_SHEETS_CLIENT_EMAIL}) no tiene permisos para acceder a la hoja. Asegúrate de compartir la hoja con este email y darle permisos de editor.`);
    }

    log(`Error inesperado al guardar en Google Sheets: ${error.message}`);
    throw new Error(`Error al guardar en Google Sheets: ${error.message}`);
  }
}