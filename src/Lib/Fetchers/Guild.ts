import { DiscordClient } from "@lib";


export class GuildFetcher {
    private client: DiscordClient;

    public constructor(client: DiscordClient) {
        this.client = client;
    }

    public get(identifier: string) {
        const guild = this.client.guilds.cache
            .find(
                (g) => g.id === identifier ||
                    g.name === identifier
            );

        return guild || null;
    }
} 