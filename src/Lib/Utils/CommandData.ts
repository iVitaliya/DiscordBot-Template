import {
    Collection,
    Guild,
    Message
} from "discord.js";

import {
    Colors,
    Command,
    DiscordClient,
    Embed,
    FooterTime,
    GuildBasedTextChannels,
    Icons,
    Processor
} from "@lib";


export async function SendSettings(message: Message, channel: GuildBasedTextChannels, guild: Guild, cmd: Command) {
    if (cmd.settings.nsfw && !channel.nsfw) {
        await channel.send({
            embeds: [
                new Embed()
                    .setAuthor({ name: "Permission Denied", icon_url: Icons.Failed })
                    .setDescription([
                        `\`${cmd.name}\` requires to be executed in a channel marked as nsfw,`,
                        "make sure it's marked as one or ask an server administrator to mark this channel as nsfw."
                    ].join(" "))
                    .setColor(Colors.Failed)
                    .setFooter({ text: FooterTime })
                    .build()
            ]
        });
    }

    if (guild.ownerId !== message.author.id && cmd.settings.owner) {
        await channel.send({
            embeds: [
                new Embed()
                    .setAuthor({ name: "Permission Denied", icon_url: Icons.Failed })
                    .setDescription(`\`${cmd.name}\` can only be used by the server owner.`)
                    .setColor(Colors.Failed)
                    .setFooter({ text: FooterTime })
                    .build()
            ]
        });
    }

    if (!Processor.CheckPermissions(message.member!, "Administrator").missing_permissions && cmd.settings.admin) {
        await channel.send({
            embeds: [
                new Embed()
                    .setAuthor({ name: "Permission Denied", icon_url: Icons.Failed })
                    .setDescription(`\`${cmd.name}\` can only be used by the server admins.`)
                    .setColor(Colors.Failed)
                    .setFooter({ text: FooterTime })
                    .build()
            ]
        });
    }
}

export async function SendPerms(msg: Message, permissions: string, cmd: string, client: boolean, channel: boolean) {
    if (permissions.length < 1) {
        return;
    }

    await msg.channel.send({
        embeds: [
            new Embed()
                .setAuthor({ name: "Permission Denied", icon_url: Icons.Failed })
                .setDescription(client
                    ? `I'm missing ${channel ? "channel" : "server"} permission so I couldn't execute the requested operation.`
                    : `You're missing ${channel ? "channel" : "server"} permissions so I couldn't execute the requested operation.`)
                .setColor(Colors.Failed)
                .addField({ name: "Missing Permissions", value: permissions, inline: true })
                .addField({ name: "Occurred Command", value: cmd, inline: true })
                .setFooter({ text: FooterTime })
                .build()
        ]
    });
}

export async function SendCooldown(client: DiscordClient, data: { channel: GuildBasedTextChannels, message: Message, cmd: Command }) {
    if (!client.cooldown.has(data.cmd.name)) {
        client.cooldown.set(data.cmd.name, new Collection());
    }

    const currentTime = Date.now(),
        timestamps = client.cooldown.get(data.cmd.name),
        cooldownTime = data.cmd.settings.cooldown * 1000;

    if (timestamps!.has(`${data.message.author.id}.${data.message.guild!.id}.${data.cmd.name}`)) {
        const cooldownExperation = timestamps!.get(`${data.message.author.id}.${data.message.guild!.id}.${data.cmd.name}`)! + cooldownTime;

        if (cooldownTime < cooldownExperation) {
            const timeLeft = (cooldownExperation - currentTime) / 1000;
            await data.channel.send({
                embeds: [
                    new Embed()
                        .setAuthor({ name: "On Cooldown", icon_url: Icons.Failed })
                        .setDescription([
                            "You're currently on cooldown since you've already ran this command recently, please wait",
                            `\`${timeLeft.toFixed(1)}\` more seconds before running this command again.`
                        ].join(" "))
                        .setColor(Colors.Failed)
                        .setFooter({ text: FooterTime })
                        .build()
                ]
            });
        } else {
            timestamps!.delete(`${data.message.author.id}.${data.message.guild!.id}.${data.cmd.name}`);
        }
    }

    timestamps!.set(`${data.message.author.id}.${data.message.guild!.id}.${data.cmd.name}`, currentTime);
}

export async function SendNoArgs(client: DiscordClient, channel: GuildBasedTextChannels, args: string[], cmd: Command) {
    if (args.length < cmd.required_args) {
        await channel.send({
            embeds: [
                new Embed()
                    .setAuthor({ name: "Invalid Arguments", icon_url: Icons.Failed })
                    .setDescription([
                        "You didn't provide enough arguments, please run the command again with the required arguments.",
                        "**`<>`** **= Required |** **`[]`** **= Optional**"
                    ].join("\n"))
                    .addField({
                        name: (typeof cmd.usages === "string" ? "Usage" : "Usages"),
                        value: (
                            typeof cmd.usages === "string"
                                ? cmd.usages.replace("<prefix>", client.prefix[channel.guild.id])
                                : cmd.usages.join("\n").replace(/<prefix>/g, client.prefix[channel.guild.id])
                        ),
                        inline: false
                    })
                    .addField({
                        name: (typeof cmd.examples === "string" ? "Example" : "Examples"),
                        value: (
                            typeof cmd.examples === "string"
                                ? cmd.examples.replace("<prefix>", client.prefix[channel.guild.id])
                                : cmd.examples.join("\n").replace(/<prefix>/g, client.prefix[channel.guild.id])
                        ),
                        inline: false
                    })
                    .setColor(Colors.Failed)
                    .setFooter({ text: FooterTime })
                    .build()
            ]
        });
    } else if (cmd.required_args === -1) {
        return;
    } else {
        return;
    }
}