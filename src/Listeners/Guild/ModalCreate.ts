import { BaseInteraction, ChatInputCommandInteraction, InteractionType } from "discord.js";

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
        if (interaction.type === InteractionType.ModalSubmit) {
            interaction
        }
    }
}

function runChatInputCommand(client: DiscordClient, interaction: BaseInteraction) {
    const { modals } = client;
    const { id } = interaction;
    const command = slashCommands.get(commandName);

}