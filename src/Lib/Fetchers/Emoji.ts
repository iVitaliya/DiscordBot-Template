import { Guild } from "discord.js";

import { DiscordClient } from "@lib";


export class EmojiFetcher {
    private client: DiscordClient;
    private guild: Guild;

    public constructor(client: DiscordClient, guild: Guild) {
        this.client = client;
        this.guild = guild;
    }

    public getGuild(identifier: string) {
        const emoji = this.guild.emojis.cache
            .find(
                (e) => e.name === identifier ||
                    e.id === identifier ||
                    `<:${e.name}:${e.id}>` === identifier ||
                    `<a:${e.name}:${e.id}>` === identifier
            );

        return emoji || null;
    }

    public getClient(identifier: string) {
        const emoji = this.client.emojis.cache
            .find(
                (e) => e.id === identifier ||
                    `<:${e.name}:${e.id}>` === identifier ||
                    `<a:${e.name}:${e.id}>` === identifier
            );
        
        return emoji || null;
    }
} 