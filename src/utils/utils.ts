import { send } from "@sapphire/plugin-editable-commands";
import type { ChatInputCommandInteraction, ContextMenuCommandInteraction, Message } from "discord.js";

import { FooterText, MessageContentMessages, MessageEmbed, RandomLoadingMessage, logger } from "../lib/index";


const Log = logger({ name: "Utils" });

/**
 * Picks a random item from an array
 * @param array The array to pick a random item from
 * @example
 * const randomEntry = pickRandom([1, 2, 3, 4]); // 1
 */
export function pickRandom<T>(array: readonly T[]): T {
    const { length } = array;
    const random = array[Math.floor(Math.random() * length)];

    if (random === undefined) throw Log.error("The provided array couldn't be used as an array to randomize from, please try another type of array or retry to make sure it's not working");
    return random;
}

/**
 * Sends a loading message to the current channel
 * @param message The message data for which to send the loading message
 */
export function sendLoadingMessage(message: Message): Promise<Message> {
    return send(message, {
        embeds: [
            new MessageEmbed("Settings")
                .setAuthor({ name: "Loading..." })
                .setDescription(pickRandom(RandomLoadingMessage))
                .setTimestamp()
                .setFooter({ text: FooterText })
                .build
        ]
    });
}

export function sendErrorMessage(
    interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction,
    embed: MessageEmbed,
    checkReplied: boolean
) {
    if (checkReplied && interaction.replied) return interaction.editReply({
        content: MessageContentMessages.MEMBER_PERMISSIONS,
        embeds: [embed.build]
    });
    else return interaction.reply({
        content: MessageContentMessages.MEMBER_PERMISSIONS,
        embeds: [embed.build]
    });
}