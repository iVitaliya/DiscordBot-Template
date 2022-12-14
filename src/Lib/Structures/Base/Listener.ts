import { ClientEvents } from "discord.js";

import { DiscordClient, IListener, ListenerCategory } from "@lib";


export class Listener implements IListener {
    public client: DiscordClient;

    category: ListenerCategory;
    name: keyof ClientEvents;
    description: string;
    once: boolean;

    public constructor(client: DiscordClient, data: IListener) {
        this.client = client;

        this.category = data.category;
        this.name = data.name;
        this.description = data.description ?? "";
        this.once = data.once;
    }

    public async exec(...args: unknown[]): Promise<unknown | void> {
        throw this.client.logger.error("This operation doesn't do anything!");
    }
}