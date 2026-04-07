import { REST, Routes, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import path from "path";
import { CommandMeta } from "@/types";
import { env } from "@/config/env";
import { Logger } from "@/services/logger";
import { resolveModuleFiles } from "@/utils/fileLoader";

const logger = new Logger("Deploy");

async function deploy(): Promise<void> {
  const rest = new REST().setToken(env.discord.token);
  const commandsDir = path.resolve(__dirname, "../commands");
  const files = await resolveModuleFiles(commandsDir);

  const body: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

  for (const file of files) {
    const mod = (await import(file)) as { default?: CommandMeta };
    if (mod.default) {
      body.push(mod.default.data.toJSON());
    }
  }

  const route = env.discord.guildId
    ? Routes.applicationGuildCommands(env.discord.clientId, env.discord.guildId)
    : Routes.applicationCommands(env.discord.clientId);

  logger.info(`Started refreshing ${body.length} application (/) commands.`);

  await rest.put(route, { body });

  logger.info("Successfully reloaded application (/) commands.");
}

deploy().catch((err) => {
  logger.error("Failed to deploy commands", err);
  process.exit(1);
});