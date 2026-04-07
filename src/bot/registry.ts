import path from "path";
import { LuminousClient } from "@/bot/LuminousClient";
import { CommandMeta, EventHandler } from "@/types";
import { Logger } from "@/services/logger";
import { resolveModuleFiles } from "@/utils/fileLoader";

const COMMANDS_DIR = path.resolve(__dirname, "../commands");
const EVENTS_DIR = path.resolve(__dirname, "../events");
const logger = new Logger("Registry");

export async function registerCommands(client: LuminousClient): Promise<void> {
  const files = await resolveModuleFiles(COMMANDS_DIR);
  let count = 0;

  for (const file of files) {
    const mod = (await import(file)) as { default?: CommandMeta };

    if (!mod.default) continue;

    const command = mod.default;
    client.commands.set(command.data.name, command);
    count++;
  }
  logger.info(`Loaded ${count} commands.`);
}

export async function registerEvents(client: LuminousClient): Promise<void> {
  const files = await resolveModuleFiles(EVENTS_DIR);
  let count = 0;

  for (const file of files) {
    const mod = (await import(file)) as { default?: EventHandler<any> };

    if (!mod.default) continue;

    const event = mod.default;

    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
      client.on(event.name, (...args) => event.execute(client, ...args));
    }
    count++;
  }
  logger.info(`Loaded ${count} events.`);
}