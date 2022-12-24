import {
    ChatInputCommandInteraction,
    InteractionResponse,
    SlashCommandBuilder
} from "discord.js";

import {
    DiscordClient,
    ISlashCommand
} from "@lib";


export class SlashCommand implements ISlashCommand {
    public client: DiscordClient;

    data: SlashCommandBuilder;

    public constructor(client: DiscordClient, data: ISlashCommand) {
        this.client = client;
        this.data = data.data;
    }

    exec(interaction: ChatInputCommandInteraction): Promise<InteractionResponse | void> {
        throw this.client.logger.error("This operation doesn't do anything!");
    }
}