import type { Guild } from "discord.js";
import type {
    IChannelReturn, IEmojiReturn, IMemberReturn,
    IMessageReturn, IRoleReturn, IUserReturn,
    TextBasedChannels
} from "../lib/index";

/** A class which helps with searching through the cache for certain entities. */
export class CacheResolver {
    private guild: Guild;

    /** A class which helps with searching through the cache for certain entities. */
    public constructor(guild: Guild) {
        this.guild = guild;
    }

    /**
     * A property which helps searching for a user with the provided value.
     * @param value - The value which will be used to search for a user, values that may be used are: ID, tag or mention.
     * @returns A object containing if the fetch was valid and the user object if the fetch was valid, if it wasn't valid then the user object will instead return `undefined`
     */
    public user(value: string): IUserReturn {
        const u = this.guild.client.users.cache.find(
            (x) => x.username.toLowerCase() === value.toLowerCase() ||
                x.tag.toLowerCase() === value.toLowerCase() ||
                x.id === value.replace(/[\\<>@!]/g, '')
        );

        if (u === undefined) {
            return {
                valid_fetch: false,
                user: null
            };
        }

        return {
            valid_fetch: true,
            user: u
        };
    }

    /**
     * A property which helps searching for a guild-member with the provided value.
     * @param value - The value which will be used to search for a guild-member, values that may be used are: ID, tag, nickname/display-name or mention.
     * @returns A object containing if the fetch was valid and the guild-member object if the fetch was valid, if it wasn't valid then the guild-member object will instead return `undefined`
     */
    public member(value: string): IMemberReturn {
        const m = this.guild.members.cache.find(
            (x) => x.user.username.toLowerCase() === value.toLowerCase() ||
                x.user.tag.toLowerCase() === value.toLowerCase() ||
                x.displayName.toLowerCase() === value.toLowerCase() ||
                x.id === value.replace(/[\\<>@!]/g, '')
        );

        if (m === undefined) {
            return {
                valid_fetch: false,
                member: null
            };
        }

        return {
            valid_fetch: true,
            member: m
        };
    }

    /**
     * A property which helps searching for a role with the provided value.
     * @param value - The value which will be used to search for a role, values that may be used are: ID, name or mention.
     * @returns A object containing if the fetch was valid and the role object if the fetch was valid, if it wasn't valid then the role object will instead return `undefined`
     */
    public role(value: string): IRoleReturn {
        const r = this.guild.roles.cache.find(
            (x) => x.name.toLowerCase() === value.toLowerCase() ||
                x.id === value.replace(/[\\<>@&]/g, '')
        );

        if (r === undefined) {
            return {
                valid_fetch: false,
                role: null
            };
        }

        return {
            valid_fetch: true,
            role: r
        };
    }

    /**
     * A property which helps searching for a channel with the provided value.
     * @param value - The value which will be used to search for a channel, values that may be used are: ID, name or mention.
     * @returns A object containing if the fetch was valid and the channel object and the channel type if the fetch was valid, if it wasn't valid then the channel object and the channel type will instead return `undefined`
     */
    public channel(value: string): IChannelReturn {
        const c = this.guild.channels.cache.find(
            (x) => x.name.toLowerCase() === value.toLowerCase() ||
                x.id === value.replace(/[\\<>#]/g, '')
        );

        if (c === undefined) {
            return {
                valid_fetch: false,
                channel: null,
                channel_type: null
            };
        }

        return {
            valid_fetch: true,
            channel: c,
            channel_type: c.type
        };
    }

    /**
     * A property which helps searching for a message with the provided value.
     * @param value - The value which will be used to search for a message, values that may be used are: ID.
     * @param channel - The channel to use to search the message in.
     * @returns A object containing if the fetch was valid and the message object if the fetch was valid, if it wasn't valid then the message object will instead return `undefined`
     */
    public message(value: string, channel: TextBasedChannels): IMessageReturn {
        const msg = channel.messages.cache.find(
            (x) => x.id === value
        );

        if (msg === undefined) {
            return {
                valid_fetch: false,
                message: null
            };
        }

        return {
            valid_fetch: true,
            message: msg
        };
    }

    /**
     * A property which helps searching for a emoji with the provided value.
     * @param value - The value which will be used to search for a message, values that may be used are: ID, name and mention.
     * @returns A object containing if the fetch was valid and the emoji object if the fetch was valid, if it wasn't valid then the emoji object will instead return `undefined`
     */
    public emoji(value: string): IEmojiReturn {
        const e = this.guild.emojis.cache.find(
            (x) => `<:${x.name!}:${x.id}>` === value ||
                x.name!.toLowerCase() === value.toLowerCase() ||
                x.id === value
        );

        if (e === undefined) {
            return {
                valid_fetch: false,
                emoji: null
            };
        }

        return {
            valid_fetch: true,
            emoji: e
        };
    }
}