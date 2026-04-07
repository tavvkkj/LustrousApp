import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  Collection,
  ClientEvents,
  PermissionsString,
} from "discord.js";
import { LuminousClient } from "@/bot/LuminousClient";

export type SupportedLocale = "en-US" | "pt-BR" | "ru" | "es-ES";

export interface LocaleStrings {
  [key: string]: string | LocaleStrings;
}

export interface CommandMeta {
  data:
    | SlashCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  
  userPermissions?: PermissionsString[];
  botPermissions?: PermissionsString[];
  developerOnly?: boolean;
  
  execute: (
    interaction: ChatInputCommandInteraction,
    client: LuminousClient,
    locale: SupportedLocale
  ) => Promise<void>;
}

export interface EventHandler<K extends keyof ClientEvents = keyof ClientEvents> {
  name: K;
  once?: boolean;
  execute: (client: LuminousClient, ...args: ClientEvents[K]) => Promise<void> | void;
}

export type CommandCollection = Collection<string, CommandMeta>;