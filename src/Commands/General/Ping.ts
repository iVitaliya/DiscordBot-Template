import { Command, DiscordClient, GuildBasedTextChannels } from "@lib";
import { Message, GuildMember, Guild } from "discord.js";


export class PingCommand extends Command {
    constructor(client: DiscordClient) {
        super(client, {
            category: "General",
            name: "ping",
            aliases: [],
            examples: "ping",
            usages: "ping",
            description: "Retrieves the ping of the bot towards Discord and back",
            required_args: 0,

            permissions: {
                channel: {
                    client: ["SendMessages", "EmbedLinks"],
                    user: []
                },
                server: {
                    client: ["SendMessages", "EmbedLinks"],
                    user: []
                }
            },

            settings: {
                nsfw: false,
                admin: false,
                owner: false,
                developer: false,
                cooldown: 3
            }
        });
    }

    public override exec(message: Message, _args: string[], _member: GuildMember, channel: GuildBasedTextChannels, guild: Guild): Promise<void | Message> {
        //
    }
}