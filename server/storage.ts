import { rsvps, type Rsvp, type InsertRsvp } from "@shared/schema";

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
    };
    this.rsvps.set(id, rsvp);
    return rsvp;
  }
}

export const storage = new MemStorage();
