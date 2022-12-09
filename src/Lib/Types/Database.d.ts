/** IMath is an interface which is used for all the mathical calculations to set for a key in the database as value. */
interface IMath {
    add: (key: string, toAdd: number) => Promise<void>;
    devide: (key: string, toDevide: number) => Promise<void>;
    multiply: (key: string, toMultiply: number) => Promise<void>;
    substract: (key: string, toSubstract: number) => Promise<void>;
}

/** ICore is an interface which is used for all the core/general database settings. */
interface ICore {
    contains: (key: string) => Promise<boolean>;
    delete: (key: string) => Promise<void>;
    drop: () => Promise<void>;
    get: <T>(key: string, defaultValue: T) => Promise<T>;
    push: <T>(key: string, value: any | any[]) => Promise<T[]>;
    pull: <T>(key: string, value: any) => Promise<T[]>;
    set: <T>(key: string, value: T) => Promise<T>;
}

/** This is used as the main interface for the Database. */
export interface IDatabase {
    /** This method returns all the keys & values which are located in the database. */
    all: () => Promise<{
        id: string;
        value: any
    }[]>;

    math: IMath;
    core: ICore;

    /** This method retrieves the chat-prefix of the bot set for said guild. */
    prefix: (guildID: string) => Promise<string | null>;
}