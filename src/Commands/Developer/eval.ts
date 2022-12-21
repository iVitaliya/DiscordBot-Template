import beautify from "beautify";
import {
    Guild,
    GuildMember,
    Message
} from "discord.js";
import hastebin from "hastebin.js";
import { inspect } from "util";

import {
    Colors,
    Command,
    Constants,
    DiscordClient,
    Embed,
    FooterTime,
    GuildBasedTextChannels,
    Icons
} from "@lib";


const Hastebin = new hastebin();

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

    public override async exec(_message: Message, args: string[], member: GuildMember, channel: GuildBasedTextChannels, guild: Guild): Promise<void | Message<boolean>> {
        if (!Constants.SETTINGS.OWNER_ID.includes(member.id)) {
            return await channel.send({
                embeds: [
                    new Embed()
                        .setAuthor({ name: "Permission Denied", icon_url: Icons.Failed })
                        .setColor(Colors.Failed)
                        .setDescription(`\`eval\` can only be used by a developer.`)
                        .setFooter({ text: FooterTime })
                        .build()
                ]
            });
        }

        if (args.length < 1 || !args.length) {
            return await channel.send({
                embeds: [
                    new Embed()
                        .setAuthor({ name: "Invalid Arguments", icon_url: Icons.Failed })
                        .setDescription([
                            "You didn't provide enough arguments, please run the command again with the required arguments.",
                            "**`<>`** **= Required |** **`[]`** **= Optional**"
                        ].join("\n"))
                        .addField({
                            name: "Usage",
                            value: `${this.client.prefix[guild.id]}eval [Code...]`,
                            inline: false
                        })
                        .addField({
                            name: "Examples",
                            value: this.client.prefix[guild.id] + "eval message.channel.send(\`Server Member Count: ${message.guild!.members.cache.size}\`)",
                            inline: false
                        })
                        .setColor(Colors.Failed)
                        .setFooter({ text: FooterTime })
                        .build()
                ]
            });
        }

        let evaluation = args.join(" ");
        const format = (x: string) => `\`\`\`js\n${x}\`\`\``,
            embed = new Embed(),
            input = evaluation.length
                ? await Hastebin.post(evaluation)
                : format(evaluation);

        embed
            .setAuthor({ name: "Evaluation : Success", icon_url: Icons.Settings })
            .addField({ name: "Input", value: input, inline: false })

        try {
            const start = process.hrtime();
            if (evaluation.includes('await'))
                evaluation = `(async () => { ${evaluation} })()`;

            const _ = await eval(evaluation);
            const diff = process.hrtime(start);
            const code_type = typeof _;
            code_type.slice(0, 1).toUpperCase() + code_type.slice(1);
            const time = diff[0] > 0 ? `${diff[0]}s` : `${diff[1] / 1000000}ms`;
            let output = beautify(inspect(_, { depth: 0 }), {
                format: 'js'
            });

            output = output.length > 1000 ? await Hastebin.post(output) : format(output);

            embed
                .setColor(Colors.Main)
                .addField({ name: "Output", value: output, inline: false })
                .addField({
                    name: "Extra Info", value: [
                        `**Time** ${time}`,
                        `**Type** ${code_type}`
                    ].join("\n"), inline: false
                })
                .setFooter({ text: FooterTime });
        } catch (err: any) {
            const error = err.stack.length > 1000
                ? await Hastebin.post(err.stack)
                : format(err.stack);
            embed
                .setAuthor({ name: "Evaluation : Failed", icon_url: Icons.Failed })
                .setColor(Colors.Failed)
                .addField({ name: "Error", value: error, inline: false })
                .addField({ name: "Extra Info", value: "**Type** Error", inline: false });
        }

        channel.send({
            embeds: [
                embed.build()
            ]
        });
    }
}