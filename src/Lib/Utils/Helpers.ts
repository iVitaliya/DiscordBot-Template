import {
    ButtonBuilder, 
    ButtonStyle, 
    ComponentEmojiResolvable
} from "discord.js";


export type ButtonID = "pagination.begin" | "pagination.previous" | "pagination.stop" | "pagination.next" | "pagination.end";

interface ICreateButton {
    buttonID: ButtonID;
    disabled?: boolean;
    emoji?: ComponentEmojiResolvable;
    label: string;
    style: ButtonStyle;
    url?: string;
}

interface IPager {
    arr: string[] | any[];
    itemsPerPage: number;
    page: number;
}

export function CreateButton(data: ICreateButton): ButtonBuilder {
    const button = new ButtonBuilder()
        .setCustomId(data.buttonID)
        .setLabel(data.label)
        .setStyle(data.style);
    
    if (data.disabled) button.setDisabled(data.disabled);
    if (data.emoji) button.setEmoji(data.emoji);
    if (data.url) button.setURL(data.url);
    
    return button;
}

export function BasicPager(data: IPager) {
    if (!data.page) {
        data.page = 1;
    }

    const maxPages = Math.ceil(data.arr.length / data.itemsPerPage);
    if (data.page < 1 || data.page > maxPages) return null;

    return {
        data: data.arr.slice((data.page - 1) * data.itemsPerPage, data.page * data.itemsPerPage),
        max: maxPages
    };
}

export const Sleep = (time: number) => Promise.resolve(setTimeout(() => null, time));