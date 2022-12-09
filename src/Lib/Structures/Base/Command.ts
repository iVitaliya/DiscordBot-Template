import { PermissionResolvable, Message, GuildMember, Guild } from "discord.js";

import { DiscordClient, GuildBasedTextChannels, ICommand, ICommandCategory } from "@lib";


export class Command implements ICommand {
    private client: DiscordClient;

    category: ICommandCategory;
    name: string;
    aliases: string[];
    usages: string | string[];
    examples: string | string[];

    description: string;

    permissions: {
        server: {
            client: PermissionResolvable[];
            user: PermissionResolvable[];
        };
        channel: {
            client: PermissionResolvable[];
            user: PermissionResolvable[];
        };
    };

    settings: {
        nsfw: boolean;
        channel: "DM" | "GUILD";
        owner: boolean;
        developer: boolean;

        cooldown: {
            duration: number;
            limit: number;
        };
    };

    public constructor(client: DiscordClient, data: ICommand) {
        this.client = client;

        this.category = data.category;
        this.name = data.name;
        this.aliases = data.aliases;
        this.usages = data.usages;
        this.examples = data.examples;

        this.description = data.description;

        this.permissions = data.permissions;
        this.permissions.server = data.permissions.server;
        this.permissions.server.client = data.permissions.server.client;
        this.permissions.server.user = data.permissions.server.user;
        this.permissions.channel = data.permissions.channel;
        this.permissions.channel.client = data.permissions.channel.client;
        this.permissions.channel.user = data.permissions.channel.user;

        this.settings = data.settings;
        this.settings.nsfw = data.settings.nsfw;
        this.settings.channel = data.settings.channel;
        this.settings.owner = data.settings.owner;
        this.settings.developer = data.settings.developer;
        this.settings.cooldown = data.settings.cooldown;
        this.settings.cooldown.duration = data.settings.cooldown.duration;
        this.settings.cooldown.limit = data.settings.cooldown.limit;
    }

    public async exec(message: Message, args: string[], member: GuildMember, channel: GuildBasedTextChannels, guild: Guild): Promise<Message | void> {
        throw this.client.logger.error("This operation doesn't do anything!");
    }
}