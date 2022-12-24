import {
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";


export interface ISlashCommand {
    data: SlashCommandBuilder;
    exec(interaction: ChatInputCommandInteraction): Promise<InteractionResponse | void>;
}