import { PermissionResolvable } from "discord.js";


export type ICommandCategory = "Utilities" | "Staff" | "Developer" | "Fun";
export interface ICommand {
    category: ICommandCategory;
    name: string;
    aliases: string[];
    usages: string | string[];
    examples: string | string[];

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
        channel: "DM" | "GUILD";
        owner: boolean;
        developer: boolean;

        cooldown: {
            duration: number;
            limit: number;
        };
    };
}