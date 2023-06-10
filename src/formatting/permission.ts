import type { GuildMember } from "discord.js";
import type { UserRoleInfo } from "../lib/index";

export class PermissionFormat {
    /**
     * Formats the provided permission to a prettier format.
     * @param permission - The permission to format.
     * @returns The permission into a string and formatted to a prettier format.
     */
    public format(permission: string): string {
        return permission
            .toLowerCase()
            .replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
            .replace(/_/g, ' ')
            .replace(/Guild/g, 'Server')
            .replace(/Use Vad/g, 'Use Voice Acitvity');
    }

    /**
     * Formats the provided permissions to a prettier format.
     * @param permission - The permissions to format.
     * @returns The permissions into a string and formatted to a prettier format.
     */
    public formatMultiple(permission: string[]): string[] {
        let prms: string[] = [];

        permission.forEach((p) => {
            let prm = p.toLowerCase()
                .replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
                .replace(/_/g, ' ')
                .replace(/Guild/g, 'Server')
                .replace(/Use Vad/g, 'Use Voice Acitvity');

            prms.push(prm);
        });

        return prms;
    }

    /**
     * Compares a member and a targetted member to see if the targetted member has a higher role than the provided member.
     * @param member - The member to check.
     * @param target - The targetted member to check.
     * @returns A boolean, defining if the targetted member is above the member or not.
     */
    public compare(member: GuildMember, target: GuildMember): boolean {
        return member.roles.highest.position < target.roles.highest.position;
    }

    /**
     * Fetches all permissions/role information for a user.
     * @param member - The member to fetch for.
     * @returns All information of the provided member.
     */
    public info(member: GuildMember): UserRoleInfo {
        const obj: UserRoleInfo = {
            highest: {
                mention: `<@&${member.roles.highest}>`,
                id: member.roles.highest.id,
                name: member.roles.highest.name
            },
            roles: member.roles.cache.map((rl) => rl).sort((a: any, b: any) => b - a),
            roles_collection: member.roles.cache
        };

        return obj as UserRoleInfo;
    }
}