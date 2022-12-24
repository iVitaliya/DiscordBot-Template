import { PermissionResolvable } from "discord.js";


export type ICommandCategory = "General" | "Utilities" | "Staff" | "Developer" | "Fun";
export interface ICommand {
    category: ICommandCategory;
    name: string;
    aliases: string[];
    usages: string | string[];
    examples: string | string[];
    required_args: number;

    description: string;

    permissions: {
        server: {
            client: PermissionResolvable[];
            user: PermissionResolvable[];
        };
        channel: {
            client: PermissionResolvable[];
            user: PermissionResolvable[];
        };
    };

    settings: {
        nsfw: boolean;
        admin: boolean;
        owner: boolean;
        developer: boolean;
        cooldown: number;
    };
}