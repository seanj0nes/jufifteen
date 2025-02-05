import { rsvps, type Rsvp, type InsertRsvp } from "@shared/schema";
import { appendToSheet } from "./sheets";
import { log } from "./vite";

export interface IStorage {
  getRsvps(): Promise<Rsvp[]>;
  createRsvp(rsvp: InsertRsvp): Promise<Rsvp>;
}

export class MemStorage implements IStorage {
  private rsvps: Map<number, Rsvp>;
  private currentId: number;

  constructor() {
    this.rsvps = new Map();
    this.currentId = 1;
  }

  async getRsvps(): Promise<Rsvp[]> {
    return Array.from(this.rsvps.values());
  }

  async createRsvp(insertRsvp: InsertRsvp): Promise<Rsvp> {
    const id = this.currentId++;
    const rsvp: Rsvp = {
      ...insertRsvp,
      id,
      createdAt: new Date(),
      dietaryRestrictions: insertRsvp.dietaryRestrictions || null,
      message: insertRsvp.message || null,
    };

    try {
      // Guardar en memoria
      this.rsvps.set(id, rsvp);
      log(`RSVP guardado en memoria para ${insertRsvp.name}`);

      // Intentar guardar en Google Sheets
      await appendToSheet(insertRsvp);
      log(`RSVP guardado exitosamente para ${insertRsvp.name}`);
    } catch (error) {
      // Loguear el error pero no interrumpir la operación
      log(`Error al guardar en Google Sheets: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      // El RSVP ya está guardado en memoria, así que continuamos
    }

    return rsvp;
  }
}

export const storage = new MemStorage();