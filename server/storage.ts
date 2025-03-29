import { type InsertRsvp, type Rsvp } from "@shared/schema";

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
    const createdAt = new Date();
    const rsvp: Rsvp = {
      id,
      createdAt,
      ...insertRsvp,
    };

    this.rsvps.set(id, rsvp);
    
    // Ya no usamos Google Sheets, usamos formsubmit.co
    // El formulario envía los datos directamente
    
    return rsvp;
  }
}

export const storage = new MemStorage();