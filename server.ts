import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import busArrivalHandler from "./api/bus-arrival.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mount Vercel-compatible API route for LTA BusArrival v3
  app.get("/api/bus-arrival", async (req, res) => {
    await busArrivalHandler(req, res);
  });

  app.get("/api/bus-arrival.ts", async (req, res) => {
    await busArrivalHandler(req, res);
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
