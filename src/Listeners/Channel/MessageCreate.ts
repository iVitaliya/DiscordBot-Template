import {
    ChannelType,
    GuildMember as Member,
    Message
} from "discord.js";

import {
    Command,
    Config,
    DiscordClient,
    GuildBasedTextChannels,
    Listener,
    Processor,
    SendCooldown,
    SendNoArgs,
    SendPerms,
    SendSettings
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
        if (!this.client.prefix[message.guild!.id]) {
            this.client.prefix[message.guild!.id] = await this.client.db().core.get(`${message.guild!.id}.prefix`, "?");
        }

        const Prefix = this.client.prefix[message.guild!.id] || Config.get("PREFIX") || "?";
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

            await SendCooldown(this.client, {
                message: message,
                channel: message.channel as GuildBasedTextChannels,
                cmd: command
            });

            await SendNoArgs(this.client, message.channel as GuildBasedTextChannels, args, command);

            command.exec(message, args, message.member!, message.channel as GuildBasedTextChannels, message.guild!);
        }
    }
}

function ChannelPermissions(member: Member, cmd: Command) {
    return {
        client: Processor.CheckPermissions(member, cmd.permissions.channel.client),
        user: Processor.CheckPermissions(member, cmd.permissions.channel.user)
    };
}

function ServerPermisions(member: Member, cmd: Command) {
    return {
        client: Processor.CheckPermissions(member, cmd.permissions.server.client),
        user: Processor.CheckPermissions(member, cmd.permissions.server.user)
    };
}