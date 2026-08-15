import "dotenv/config";
import app from "./app.js";

const PORT = Number(process.env.PORT) || 3000;
const server = app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
  console.log(`Check server health on http://localhost:${PORT}/api/v1/health`);
});

const shutdown = (signal: string) => {
  console.log(`\n${signal} received. shutting down...`);

  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
