import { ClientEvents } from "discord.js";

export type ListenerCategory = "Client" | "Message" | "Role" | "Guild" | "Channel" | "Development";
export interface IListener {
    category: ListenerCategory;
    name: keyof ClientEvents;
    description?: string;
    once: boolean;
}