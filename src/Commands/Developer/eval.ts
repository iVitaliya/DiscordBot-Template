import { Command, DiscordClient, GuildBasedTextChannels } from "@lib";
import { Message, GuildMember, Guild } from "discord.js";


export class EvalCommand extends Command {
    constructor(client: DiscordClient) {
        super(client, {
            category: "Developer",
            name: "eval",
            aliases: ["ev"],
            examples: "eval [Code to execute]",
            usages: "eval this.client.fetch;",
            description: "Executes a code inside Discord",

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
                developer: true,

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