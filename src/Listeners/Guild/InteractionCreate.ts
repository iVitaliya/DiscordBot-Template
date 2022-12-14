import { BaseInteraction, ChatInputCommandInteraction } from "discord.js";

import { DiscordClient, Listener } from "@lib";


export class InteractionCreateListener extends Listener {
    public constructor(client: DiscordClient) {
        super(client, {
            category: "Guild",
            name: "interactionCreate",
            description: "",
            once: true
        });
    }

    public override exec(interaction: BaseInteraction): Promise<unknown> {
        if (interaction.isCommand() && interaction.isChatInputCommand()) {
            
        }
    }
}

function runChatInputCommand(client: DiscordClient, interaction: ChatInputCommandInteraction) {
    const { slashCommands } = client;
    const { commandName } = interaction;
    const command = slashCommands.get(commandName);
    
}