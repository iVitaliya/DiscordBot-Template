import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: ChatInputCommandInteraction) {
        this.data.name
    },
};