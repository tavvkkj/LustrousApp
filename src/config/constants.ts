import { SupportedLocale } from "@/types";
import { ActivityType, PresenceUpdateStatus } from "discord.js";

export const Constants = {
  DefaultLocale: "en-US" as SupportedLocale,
  SupportedLocales: ["en-US", "pt-BR", "ru", "es-ES"] as SupportedLocale[],
  Colors: {
    Primary: 0x5865F2,
    Success: 0x57F287,
    Warning: 0xFEE75C,
    Error: 0xED4245,
  },
  Presence: {
    Status: PresenceUpdateStatus.Idle,
    UpdateIntervalMs: 15000,
    Activities: [
      {
        name: "Custom Status",
        type: ActivityType.Custom,
        state: "Powered by Luminous Group",
      },
      {
        name: "luminousgroup.com",
        type: ActivityType.Watching,
      },
      {
        name: "luminousgroup.com/discord",
        type: ActivityType.Watching,
      },
    ],
  },
} as const;