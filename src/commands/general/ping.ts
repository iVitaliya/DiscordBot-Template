import { ApplyOptions } from "@sapphire/decorators";
import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { Command, RegisterBehavior } from "@sapphire/framework";
import { ApplicationCommandType } from "discord-api-types/v10";
import { FooterText, MessageEmbed, RandomLoadingMessage } from "../../lib/index";

import type { CommandOptions } from "@sapphire/framework";

@ApplyOptions<CommandOptions>({
    name: "ping",
    description: "Ping bot to see if it is alive"
})
export class PingCommand extends Command {
    async ping(interaction: Command.ChatInputCommandInteraction | Command.ContextMenuCommandInteraction) {
        const embed = new MessageEmbed("Main")
            .setAuthor({ name: "Pinging" })
            .setDescription("`Please wait...`")
            .setFooter({ text: FooterText });

        const msg = await interaction.reply({ embeds: [embed.build], ephemeral: true, fetchReply: true });
        const pings: number[] = [];

        if (!isMessageInstance(msg)) throw new Error("[Command : Ping] Failed to send message.");

        for (let i = 0; i < RandomLoadingMessage.length; i++) {
            const m = RandomLoadingMessage[i];
            const _m = msg.edit({
                embeds: [
                    new MessageEmbed("Main")
                        .setAuthor({ name: "Pinging..." })
                        .setDescription(m)
                        .build
                ]
            });

            i === 0 
                ? pings.push(msg.createdTimestamp - (await _m).editedTimestamp!)
                : pings.push(pings[i - 1] - (await _m).editedTimestamp!);
        }

        const ping = Math.round(this.container.client.ws.ping);

        // `Round trip took: ${diff}ms. Heartbeat: ${ping}ms`
        embed
            .setAuthor({ name: "Pong!" })
            .setDescription(`**Heartbeat** ${ping}ms`)
            .addField({
                name: "\u200b",
                value: `${pings.join("ms\n")}ms`
            });

        return interaction.editReply({ embeds: [embed.build] });
    }

    chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        return this.ping(interaction);
    }

    contextMenuRun(interaction: Command.ContextMenuCommandInteraction) {
        return this.ping(interaction);
    }

    registerApplicationCommands(registry: Command.Registry) {
        registry.registerContextMenuCommand((builder) => builder.setName("ping").setType(ApplicationCommandType.Message),
            { behaviorWhenNotIdentical: RegisterBehavior.Overwrite });

        registry.registerChatInputCommand((builder) => builder.setName("ping").setDescription("Ping the bot to see if it is alive."),
            { behaviorWhenNotIdentical: RegisterBehavior.Overwrite });
    }
}