import type { GuildBasedChannel, GuildEmoji, GuildMember, Message, Role, User } from "discord.js";
import type { ChannelTypes } from "./discord-types";

export type IUserReturn = {
    valid_fetch: boolean;
    user: User | null;
};

export type IMemberReturn = {
    valid_fetch: boolean;
    member: GuildMember | null;
};

export type IRoleReturn = {
    valid_fetch: boolean;
    role: Role | null;
};

export type IChannelReturn = {
    valid_fetch: boolean;
    channel: GuildBasedChannel | null;
    channel_type: ChannelTypes | null;
};

export type IMessageReturn = {
    valid_fetch: boolean;
    message: Message | null;
};

export type IEmojiReturn = {
    valid_fetch: boolean;
    emoji: GuildEmoji | null;
};