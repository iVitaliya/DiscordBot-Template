import {
    Guild,
    GuildMember,
    Message
} from "discord.js";

import {
    Colors,
    Command,
    DiscordClient,
    Embed,
    FooterTime,
    GuildBasedTextChannels,
    Icons
} from "@lib";


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

    public override async exec(_message: Message<boolean>, _args: string[], _member: GuildMember, channel: GuildBasedTextChannels, _guild: Guild): Promise<void | Message<boolean>> {
        const msg = await channel.send("🏓 Retrieving ping...");

        await msg.edit({
            content: "",
            embeds: [
                new Embed()
                    .setAuthor({ name: "Ping : Success", icon_url: Icons.Success })
                    .setColor(Colors.Main)
                    .setDescription([
                        `**Message Latency** ${Math.abs(msg.createdAt.getMilliseconds() - Date.now())}ms`,
                        `**API Latency** ${Math.round(this.client.ws.ping)}ms`
                    ].join("\n"))
                    .setFooter({ text: FooterTime })
            ]
        });
    }
}