import { SupportedLocale } from "@/types";
import { env } from "@/config/env";

export class GuildService {
  /**
   * vê a linguagem configurada pelo servidor
   * em produção, isso aq faria uma busca no banco de dados da guild
   */
  public static async getLocale(guildId: string | null): Promise<SupportedLocale> {
    if (!guildId) return env.defaultLocale;
    
    // integraçao com o db
    // const guildConfig = await db.guilds.findUnique({ where: { id: guildId } });
    // if (guildConfig && guildConfig.locale) return guildConfig.locale as SupportedLocale;

    return env.defaultLocale;
  }
}