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
            required_args: -1,

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
                developer: true,
                cooldown: 3
            }
        });
    }

    public override exec(message: Message<boolean>, args: string[], member: GuildMember, channel: GuildBasedTextChannels, guild: Guild): Promise<void | Message> {
        //
    }
}