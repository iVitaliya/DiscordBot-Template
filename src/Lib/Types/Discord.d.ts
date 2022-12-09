import {
    DMChannel,
    Guild,
    GuildMember as Member,
    Message,
    MessageCreateOptions as MessageOptions,
    PartialDMChannel,
    PartialGroupDMChannel,
    TextBasedChannel as AllTextBasedChannels,
    User
} from "discord.js";

import { Embed } from "@lib";


/** This type is used to detect only server channels. */
export type GuildBasedTextChannels = Exclude<AllTextBasedChannels, DMChannel | PartialDMChannel | PartialGroupDMChannel>;
/** This type is used to detect only DM channels. */
export type DMBasedTextChannels = DMChannel | PartialDMChannel | PartialGroupDMChannel;

/** ITimestamp is an interface which is used to make the timestamps look a bit prettier for Discord timings. */
interface ITimestamp {
    human_time: string;
    timestamp(specification: "milliseconds" | "seconds"): number;
}

/** ISendMessage is an interface which is used to make sending messages a bit nicer and more advanced. */
interface ISendMessage {
    content?: string | null;
    embed?: Embed | null;
    options?: MessageOptions | null;
    state?: "success" | "neutral" | "cancel" | "failed";
}

/** IMessage is an interface which is used to format the message class a bit nicer and little more advanced 
 * for getting the author as member and user and some other properties. */
export interface IMessage {
    sender: {
        member: GuildMember;
        user: User;
        tag: string;
        id: string | bigint;
    };
}

/** IMember is an interface which is used to send messages in a fancier way and formatting the timestamps. */
export interface IMember {
    joined: ITimestamp;
    created: ITimestamp;
    send(data: ISendMessage): Promise<Message | void>;
}

/** IMember is an interface which is used to send messages in a fancier way and formatting the timestamps. */
export interface IUser {
    created: ITimestamp;
    send(data: ISendMessage): Promise<Message | void>;
}

/** IMember is an interface which is used to fetch the prefix and formatting the timestamps. */
export interface IGuild {
    created: ITimestamp;
    prefix: Promise<string>;
}