import { Client } from "discord.js";

import { Config, DiscordClient, Listener } from "@lib";


export class ReadyListener extends Listener {
    public constructor(client: DiscordClient) {
        super(client, {
            category: "Client",
            name: "ready",
            description: "",
            once: true
        });
    }

    public override async exec(client: Client<true>): Promise<void> {
        const Prefix = this.client.prefix["default"] || Config.get("PREFIX") || "?";
        this.client.logger.info(`Your Discord bot with the tag ${client.user.tag} is ready and the bot has connected successfully to Discords gateway!`);
        this.client.logger.info(`Message Commands Default Prefix: ${Prefix} | For help, run ${Prefix}help in a channel of a server I'm in`)
        this.client.logger.info(`Serving ${client.guilds.cache.size} Guilds & ${client.users.cache.size} Users`);
    }
}
