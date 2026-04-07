import { z } from "zod";
import { Emojis } from "@/config/emojis";

const envSchema = z.object({
  DISCORD_TOKEN: z.string().min(10, "Token inválido"),
  DISCORD_CLIENT_ID: z.string().min(15, "Client ID inválido"),
  DISCORD_GUILD_ID: z.string().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DEFAULT_LOCALE: z.enum(["en-US", "pt-BR", "ru", "es-ES"]).default("en-US"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(`${Emojis.Error} Invalid environment variables:`, parsedEnv.error.format());
  process.exit(1);
}

const envVars = parsedEnv.data;

export const env = {
  discord: {
    token: envVars.DISCORD_TOKEN,
    clientId: envVars.DISCORD_CLIENT_ID,
    guildId: envVars.DISCORD_GUILD_ID,
  },
  nodeEnv: envVars.NODE_ENV,
  defaultLocale: envVars.DEFAULT_LOCALE,
} as const;