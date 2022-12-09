import { ClientEvents } from "discord.js";

export type ListenerCategory = "Client" | "Message" | "Role" | "Guild" | "Channel" | "Development";
export interface Listener {
    category: ListenerCategory | string;
    name: keyof ClientEvents;
    description?: string;
    once: boolean;
}