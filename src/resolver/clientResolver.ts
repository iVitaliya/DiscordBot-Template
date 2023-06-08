import type { SapphireClient } from "@sapphire/framework";
import { User } from "discord.js";
import type {
    ChannelTypes, IChannelReturn,
    IUserReturn, TextBasedChannels
} from "../lib/index";

/** A class which helps with searching through the client for certain entities. */
export class ClientResolver {
    private client: SapphireClient;

    public constructor(client: SapphireClient) {
        this.client = client;
    }

    /**
     * A property which helps searching for a user with the provided value.
     * @param value - The value which will be used to search for a user, values that may be used are: ID, tag or mention.
     * @returns A object containing if the fetch was valid and the user object if the fetch was valid, if it wasn't valid then the user object will instead return `undefined`
     */
    public async user(value: string): Promise<IUserReturn> {
        const u = await this.client.users.fetch(value.replace(/[\\<>@!]/g, ''), {
            cache: false,
            force: true
        });

        if (!(u instanceof User)) {
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
     * A property which helps searching for a channel with the provided value.
     * @param value - The value which will be used to search for a channel, values that may be used are: ID.
     * @returns A object containing if the fetch was valid and the channel object and the channel type if the fetch was valid, if it wasn't valid then the channel object and the channel type will instead return `undefined`
     */
    public async channel(value: string): Promise<IChannelReturn> {
        const c = await this.client.channels.fetch(value.replace(/[\\<>#]/g, ''), {
            cache: false,
            force: true
        });

        if (c === undefined || c === null) {
            return {
                valid_fetch: false,
                channel: null,
                channel_type: null
            };
        }

        return {
            valid_fetch: true,
            channel: c as TextBasedChannels,
            channel_type: c.type as ChannelTypes
        };
    }
}