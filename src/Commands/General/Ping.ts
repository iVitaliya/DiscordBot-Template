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
                channel: "GUILD",
                owner: false,
                developer: false,

                cooldown: {
                    duration: 3000,
                    limit: 3
                }
            }
        });
    }

    public override exec(message: Message<boolean>, args: string[], member: GuildMember, channel: GuildBasedTextChannels, guild: Guild): Promise<void | Message<boolean>> {
        //
    }
}