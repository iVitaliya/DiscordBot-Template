import { DiscordClient, Listener } from "@lib";


export class InteractionCreateListener extends Listener {
    public constructor(client: DiscordClient) {
        super(client, {
            category: "Guild",
            name: "interactionCreate",
            description: "",
            once: true
        });
    }

    public override exec(...args: unknown[]): Promise<unknown> {
        
    }
}