import { Collection, Role } from 'discord.js';


/** Info is and interface which is used to show info of certain roles of a user in a prettier way. */
export interface Info {
    highest: {
        mention: string;
        id: string;
        name: string;
    };
    roles: Role[];
    roleCollection: Collection<string, Role>;
}