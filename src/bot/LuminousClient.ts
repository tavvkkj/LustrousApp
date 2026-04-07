import { Client, GatewayIntentBits, Collection, PresenceUpdateStatus } from "discord.js";
import { CommandMeta } from "@/types";
import { Logger } from "@/services/logger";

export class LuminousClient extends Client {
  public readonly commands: Collection<string, CommandMeta>;
  public readonly logger: Logger;

  public constructor() {
    super({
      presence: {
        status: PresenceUpdateStatus.Idle,
      },
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.commands = new Collection();
    this.logger = new Logger("LuminousClient");
  }
}