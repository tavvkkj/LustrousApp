import { Events, Interaction } from "discord.js";
import { EventHandler } from "@/types";
import { t } from "@/services/locale";
import { Logger } from "@/services/logger";
import { GuildService } from "@/services/guild";
import { Emojis } from "@/config/emojis";

const logger = new Logger("InteractionCreate");

const interactionCreate: EventHandler<Events.InteractionCreate> = {
  name: Events.InteractionCreate,
  async execute(client, interaction: Interaction): Promise<void> {
    const locale = await GuildService.getLocale(interaction.guildId);

    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        logger.warn(`Received unknown command: ${interaction.commandName}`);
        return;
      }
      
      if (command.userPermissions && command.userPermissions.length > 0) {
        if (!interaction.memberPermissions?.has(command.userPermissions)) {
          await interaction.reply({ 
            content: `${Emojis.Error} Você não possui permissão para usar este comando.`, 
            ephemeral: true 
          });
          return;
        }
      }

      if (command.botPermissions && command.botPermissions.length > 0) {
        const botMember = interaction.guild?.members.me;
        if (!botMember?.permissions.has(command.botPermissions)) {
          await interaction.reply({ 
            content: `${Emojis.Error} Eu não tenho as permissões necessárias neste servidor para executar este comando.`, 
            ephemeral: true 
          });
          return;
        }
      }

      try {
        await command.execute(interaction, client, locale);
      } catch (error) {
        logger.error(`Error executing command: ${interaction.commandName}`, error);

        const errorMessage = `${Emojis.Error} ${t(locale, "errors.commandFailed")}`;

        try {
          if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: errorMessage, ephemeral: true });
          } else {
            await interaction.reply({ content: errorMessage, ephemeral: true });
          }
        } catch (fallbackError) {
          logger.warn(`Interaction expired for command ${interaction.commandName}, could not send error message.`);
        }
      }
      return;
    }

    if (interaction.isAutocomplete()) {
      return;
    }

    if (interaction.isMessageComponent()) {
      return;
    }

    if (interaction.isModalSubmit()) {
      return;
    }
  },
};

export default interactionCreate;