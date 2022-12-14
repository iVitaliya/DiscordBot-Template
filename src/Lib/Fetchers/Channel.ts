import { ChannelType, Guild } from "discord.js";

import { DiscordClient } from "@lib";

type ChannelTypes = ChannelType.GuildText | ChannelType.PrivateThread | ChannelType.PublicThread | ChannelType.GuildForum;
export class ChannelFetcher {
    private client: DiscordClient;
    private guild: Guild;

    public constructor(client: DiscordClient, guild: Guild) {
        this.client = client;
        this.guild = guild;
    }

    public getGuild(identifier: string, supposed_type: ChannelTypes) {
        const chan = this.guild.channels.cache
            .filter((c) => c.type === supposed_type)
            .find(
                (c) => c.name === identifier ||
                    c.id === identifier ||
                    `<#${c.id}>` === identifier
            );

        return chan || null;
    }

    public getClient(identifier: string, supposed_type: ChannelTypes) {
        const chan = this.client.channels.cache
            .filter((c) => c.type === supposed_type)
            .find(
                (c) => c.id === identifier ||
                    `<#${c.id}>` === identifier
            );
        
        return chan || null;
    }
} 