import { Events } from "discord.js";
import { EventHandler } from "@/types";
import { Constants } from "@/config/constants";

const ready: EventHandler<Events.ClientReady> = {
  name: Events.ClientReady,
  once: true,
  execute(client): void {
    client.logger.info(`Client connected and ready as ${client.user?.tag}`);

    let currentIndex = 0;

    const updatePresence = () => {
      const currentActivity = Constants.Presence.Activities[currentIndex];

      client.user?.setPresence({
        status: Constants.Presence.Status,
        activities: [currentActivity],
      });

      currentIndex = (currentIndex + 1) % Constants.Presence.Activities.length;
    };

    updatePresence();
    setInterval(updatePresence, Constants.Presence.UpdateIntervalMs);
    
    client.logger.info("Dynamic presence loop started successfully.");
  },
};

export default ready;