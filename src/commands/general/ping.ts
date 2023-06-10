import { ApplyOptions } from "@sapphire/decorators";
import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { Command, RegisterBehavior } from "@sapphire/framework";
import { ApplicationCommandType } from "discord-api-types/v10";
import { FooterText, MessageEmbed } from "../../lib/index";

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

        if (!isMessageInstance(msg)) throw new Error("[Command : Ping] Failed to send message.");

        const diff = msg.createdTimestamp - interaction.createdTimestamp;
        const ping = Math.round(this.container.client.ws.ping);

        // `Round trip took: ${diff}ms. Heartbeat: ${ping}ms`
        embed.setAuthor({ name: "Pong!" }).setDescription([
            `**Round Trip took** ${diff}ms`,
            `**Heartbeat** ${ping}ms`
        ].join("\n"));

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

        registry.registerChatInputCommand((builder) => builder.setName("ping").setDescription("Ping bot to see if it is alive."),
            { behaviorWhenNotIdentical: RegisterBehavior.Overwrite });
    }
}