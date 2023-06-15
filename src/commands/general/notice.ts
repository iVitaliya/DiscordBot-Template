import { ApplyOptions } from "@sapphire/decorators";
import { Command, RegisterBehavior } from "@sapphire/framework";
import { User, GuildMember, ChannelType } from "discord.js";
import { CacheResolver, Database, FooterText, MessageEmbed, Time, fetchMessageLink, userInGuild } from "../../lib/index";

import type { CommandOptions } from "@sapphire/framework";
import type { APIEmbedField } from "discord.js";
import type { Member, TextBasedChannels, GuildTextChannelTypes } from "../../lib/index";

@ApplyOptions<CommandOptions>({
    name: "notice",
    description: "Report a user to the staff with the provided reason"
})
export class NoticeCommand extends Command {
    async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const logChannel = await Database.get<string>(`${interaction.guildId!}.modlogs`);
        const modLog = new CacheResolver(interaction.guild!)
            .channel(logChannel);
        
        if (modLog.valid_fetch) return interaction.reply({
            embeds: [
                new MessageEmbed("Failed")
                    .setAuthor({ name: "An Error Has Occurred" })
                    .setDescription("Report notice's haven't been set up properly yet!\nplease alert a administrator to set this up.")
                    .setFooter({ text: FooterText })
                    .build
            ],
            ephemeral: true
        })
        if (![
            ChannelType.GuildText,
            ChannelType.GuildForum
        ].includes(modLog.channel_type!)) return interaction.reply({
            embeds: [
                new MessageEmbed("Failed")
                    .setAuthor({ name: "An Error Has Occurred" })
                    .setDescription("This channel isn't valid to execute slash commands in!")
                    .setFooter({ text: FooterText })
                    .build
            ],
            ephemeral: true
        });
        
        const author = interaction.member;
        const userOpt = interaction.options.getMember("target") || interaction.options.getUser("target");
        let user: Member;

        if (userOpt instanceof User) {
            if (!userInGuild(interaction.guild!, userOpt)) return interaction.reply({
                embeds: [
                    new MessageEmbed("Failed")
                        .setAuthor({ name: "An Error Has Occurred" })
                        .setDescription("That user could not be found")
                        .setFooter({ text: FooterText })
                        .build
                ]
            });

            // Check if the user is in the server, if not then:
            // tell the user the command can't be executed 
            // as the member is not in the server
            const us = new CacheResolver(interaction.guild!).member(userOpt.id).member!;
            user = us;
        } else if (!userOpt) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed("Failed")
                        .setAuthor({ name: "An Error Has Occurred" })
                        .setDescription("That user could not be found")
                        .setFooter({ text: FooterText })
                        .build
                ]
            });
        } else {
            user = userOpt;
        }

        if (!author) return;

        const reason = interaction.options.getString("reason", true);
        const reference = interaction.options.getString("message_reference", false);

        const userData: APIEmbedField[] = [
            {
                name: "General Info:",
                value: [
                    `**User**`,
                    `> ${user instanceof GuildMember
                        ? `${user.displayName} (\`${user.id}\`)`
                        : (
                            typeof user.nick === 'string'
                                ? user.nick : "Unknown User")}`,
                    user instanceof GuildMember
                        ? `> Joined at ${Time(user.joinedTimestamp!)}`
                        : ``,
                    ``,
                    `**Reporter**`,
                    `> ${author instanceof GuildMember
                        ? `${author.displayName} (\`${author.id}\`)`
                        : (
                            typeof author.nick === 'string'
                                ? author.nick : "Unknown User")}`,
                    `> Reported at ${Time(Date.now())}`
                ].join("\n")
            },
            {
                name: "Reason",
                value: reason
            },
        ];

        const embed = new MessageEmbed("Blocked")
            .setAuthor({ name: "Report Submitted" })
            .setDescription("Your report has been submitted & sent to the staff members")
            .setFooter({ text: FooterText });
        
        const staffEmbed = new MessageEmbed("HighRisk")
            .setAuthor({ name: "Report Notice" })
            .setFields(userData)
            .setFooter({ text: FooterText });
        
        if (reference) {
            const msg = new CacheResolver(interaction.guild!)
                .message(reference, interaction.channel as TextBasedChannels);
            
            if (!msg.valid_fetch) return;
            
            staffEmbed.addField({
                name: "Reference/Evidence",
                value: `[Message Reference Link](${fetchMessageLink(
                    interaction.guildId!,
                    interaction.channelId,
                    msg.message!.id
                )})`
            });
        }

        (modLog.channel! as GuildTextChannelTypes).send({
            embeds: [staffEmbed.build]
        });

        interaction.reply({
            embeds: [embed.build]
        });
    }

    registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) => builder
            .setName("notice")
            .setDescription("Report a user to the staff with the provided reason")
            .addUserOption((b) => b
                .setName("target")
                .setDescription("The user that should be reported")
                .setRequired(true))
            .addStringOption((b) => b
                .setName("reason")
                .setDescription("The reason as of why you wish to report this user")
                .setMinLength(5)
                .setRequired(true))
            .addStringOption((b) => b
                .setName("message_reference")
                .setDescription("The ID of the target's message which can be used as evidence")
                .setRequired(false)),
            { behaviorWhenNotIdentical: RegisterBehavior.Overwrite });
    }
}