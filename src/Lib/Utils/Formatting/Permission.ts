import { GuildMember } from "discord.js";

import { Info } from "@lib";


export class PermissionFormat {
    public constructor() { }

    /** Formats the given permission into readable text. */
    public format(perm: string): string {
        return perm
            .toLowerCase()
            .replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
            .replace(/_/g, ' ')
            .replace(/Guild/g, 'Server')
            .replace(/Use Vad/g, 'Use Voice Acitvity');
    }
    /** Formats the given permissions into readable text. */
    public formatMultiple(perm: string[]): string[] {
        let prms: string[] = [];

        perm.forEach((p) => {
            let prm = p.toLowerCase()
                .replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
                .replace(/_/g, ' ')
                .replace(/Guild/g, 'Server')
                .replace(/Use Vad/g, 'Use Voice Acitvity');

            prms.push(prm);
        });

        return prms;
    }

    /** Compares if the provided member has a higher priority than the provided target. */
    public compare(member: GuildMember, target: GuildMember): boolean {
        return member.roles.highest.position < target.roles.highest.position;
    }

    /** Returns info about the member. */
    public info(member: GuildMember): Info {
        const obj: Info = {
            highest: {
                mention: `<@&${member.roles.highest}>`,
                id: member.roles.highest.id,
                name: member.roles.highest.name
            },
            roles: member.roles.cache.map((rl) => rl).sort((a: any, b: any) => b - a),
            roleCollection: member.roles.cache
        };

        return obj as Info;
    }
}