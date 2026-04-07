import "dotenv/config";
import { env } from "@/config/env";
import { LuminousClient } from "@/bot/LuminousClient";
import { registerCommands, registerEvents } from "@/bot/registry";
import { preloadLocales } from "@/services/locale";
import { Constants } from "@/config/constants";
import { Logger } from "@/services/logger";

const logger = new Logger("Bootstrap");
const client = new LuminousClient();

async function bootstrap(): Promise<void> {
  try {
    preloadLocales([...Constants.SupportedLocales]);

    await registerEvents(client);
    await registerCommands(client);

    await client.login(env.discord.token);
  } catch (error) {
    logger.error("Critical failure during initialization:", error);
    process.exit(1);
  }
}

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Promise Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1); 
});

async function shutdown(signal: string) {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  
  const timeout = setTimeout(() => {
    logger.error("Forced shutdown due to timeout.");
    process.exit(1);
  }, 10000);

  try {
    client.destroy();
    logger.info("Discord client destroyed. Process terminated.");
    clearTimeout(timeout);
    process.exit(0);
  } catch (error) {
    logger.error("Error during shutdown", error);
    clearTimeout(timeout);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

bootstrap();