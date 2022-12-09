import { DiscordClient } from "@lib";


export class UserFetcher {
    private client: DiscordClient;
    
    public constructor(client: DiscordClient) {
        this.client = client;
    }

    public get(identifier: string) {
        const user = this.client.users.cache
            .find(
                (u) => u.id === identifier ||
                    `<@!${u.id}>` === identifier
            );
        
        return user || null;
    }
} 