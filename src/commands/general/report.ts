import { ApplyOptions } from "@sapphire/decorators";
import { Command, RegisterBehavior } from "@sapphire/framework";
import { ApplicationCommandType } from "discord.js";
import { FooterText, MessageEmbed } from "../../lib/index";

import type { CommandOptions } from "@sapphire/framework";

@ApplyOptions<CommandOptions>({
    name: "report",
    description: "Alert the bot owner of a bug or a abuser (Server or User)"
})
export class ReportCommand extends Command {
    

    chatInputRun(interaction: Command.ChatInputCommandInteraction) {

    }

    contextMenuRun(interaction: Command.ContextMenuCommandInteraction) {
        
    }

    registerApplicationCommands(registry: Command.Registry) {
        registry.registerContextMenuCommand((builder) => builder
            .setName("report"))
    }
}