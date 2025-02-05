import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRsvpSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  app.get("/api/rsvps", async (_req, res) => {
    const rsvps = await storage.getRsvps();
    res.json(rsvps);
  });

  app.post("/api/rsvps", async (req, res) => {
    const result = insertRsvpSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error });
      return;
    }

    const rsvp = await storage.createRsvp(result.data);
    res.json(rsvp);
  });

  return createServer(app);
}
