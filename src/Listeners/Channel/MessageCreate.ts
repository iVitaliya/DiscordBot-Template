import { Config, DiscordClient, Listener } from "@lib";
import { ChannelType, Message } from "discord.js";


export class MessageCreateListener extends Listener {
    public constructor(client: DiscordClient) {
        super(client, {
            category: "Channel",
            name: "messageCreate",
            description: "",
            once: true
        });
    }

    public override async exec(message: Message): Promise<void> {
        const Prefix = this.client.prefix["default"] || Config.get("PREFIX") || "?";
        if (message.author.bot) return;
        if (message.channel.type === ChannelType.DM) return;
        if (!message.content.startsWith(Prefix)) return;
        
        const [cmd, ...args] = message.content.trim().slice(1).split(" ");
        const command = new this.client.fetch.command(this.client).get(cmd!);
        
        if (command) {
            
        }  
    }
}