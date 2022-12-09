import { 
    DiscordClient,
    Command
} from "@lib";


export class CommandFetcher {
    private client: DiscordClient;
    
    public constructor(client: DiscordClient) {
        this.client = client;
    }

    get(identifier: string) {
        const cmd = this.client.commands.get(identifier) || this.client.commands.find((c) => c.aliases.find((a: string) => a === identifier));

        if (cmd instanceof Command) {
            return cmd;
        }

        return null;
    }
}