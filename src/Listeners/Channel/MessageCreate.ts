import {
    ChannelType, 
    Guild, 
    GuildMember, 
    Message
} from "discord.js";

import {
    Colors,
    Command, 
    Config, 
    DiscordClient, 
    Embed, 
    FooterTime, 
    GuildBasedTextChannels, 
    Icons, 
    Listener, 
    Processor
} from "@lib";


export class MessageCreateListener extends Listener {
    public constructor(client: DiscordClient) {
        super(client, {
            category: "Channel",
            name: "messageCreate",
            description: "",
            once: true
        });
    }

    public override async exec(message: Message): Promise<void> {
        const Prefix = this.client.prefix["default"] || Config.get("PREFIX") || "?";
        if (message.author.bot) return;
        if (message.channel.type === ChannelType.DM) return;
        if (!message.content.startsWith(Prefix)) return;

        const [cmd, ...args] = message.content.trim().slice(1).split(" ");
        const command = new this.client.fetch.command(this.client).get(cmd!);

        if (command) {
            const channelPerms = ChannelPermissions(message.member!, command);
            const serverPerms = ServerPermisions(message.member!, command);

            await SendPerms(message, channelPerms.client.missing, command.name, true, true);
            await SendPerms(message, channelPerms.user.missing, command.name, false, true);
            await SendPerms(message, serverPerms.client.missing, command.name, true, false);
            await SendPerms(message, serverPerms.user.missing, command.name, false, false);

            await SendSettings(message, message.channel as GuildBasedTextChannels, message.guild!, command);

            
        }
    }
}

async function SendCooldown(message: Message, cmd: Command) {

}

async function SendSettings(message: Message, channel: GuildBasedTextChannels, guild: Guild, cmd: Command) {
    if (cmd.settings.nsfw && !channel.nsfw) {
        await channel.send({
            embeds: [
                new Embed()
                    .setAuthor({ name: "Permission Denied", icon_url: Icons.Failed })
                    .setDescription(`\`${cmd.name}\` requires to be executed in a channel marked as nsfw, make sure it's marked as one or ask an server administrator to mark a channel as nsfw.`)
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

async function SendPerms(msg: Message, permissions: string, cmd: string, client: boolean, channel: boolean) {
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

    return;
}

function ChannelPermissions(member: GuildMember, cmd: Command) {
    return {
        client: Processor.CheckPermissions(member, cmd.permissions.channel.client),
        user: Processor.CheckPermissions(member, cmd.permissions.channel.user)
    };
}

function ServerPermisions(member: GuildMember, cmd: Command) {
    return {
        client: Processor.CheckPermissions(member, cmd.permissions.server.client),
        user: Processor.CheckPermissions(member, cmd.permissions.server.user)
    };
}
