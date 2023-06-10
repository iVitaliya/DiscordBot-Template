export type EmbedTypes =
    | "Main"

    | "Cancel"
    | "Pushing"
    | "Blocked"
    | "Failed"

    | "LowLatency"
    | "NormalLatency"
    | "HighLatency"

    | "LowRisk"
    | "MediumRisk"
    | "HighRisk"

    | "ToggleOff"
    | "ToggleOn"

    | "Settings"
    | "Guilds"
    | "Bugs";

/** Gets the keys of the type defined in T */
export type KeyofType<T> = keyof T;

/** Makes all properties defined in T Concrete */
export type Concrete<T> = {
    [Property in keyof T]-?: T[Property];
};

/** Finds through P a property defined in T and returns it as a type */
export type FindProperty<
    T,
    P extends KeyofType<T>
> = T[P] extends undefined ? unknown : T[P];

/** Creates getters for the properties defined in T */
export type Getters<T> = {
    [Property in KeyofType<T> as `get${Capitalize<string & Property>}`]: () => T[Property]
};

/** Makes all properties defined in T optional, except those defined in P */
export type Optional<T, P extends keyof T> = {
    [Property in keyof T]?: T[Property];
} & { [Property in P]-?: T[P]; };

/** Makes all properties defined in T readonly, except those defined in P */
export type PerformReadonly<T, P extends keyof T> = {
    readonly [Property in keyof T]: T[Property]
} & { -readonly [Prop in P]: T[P] };

/** Removes the field specified in P from T */
export type RemoveField<T, K extends keyof T> = {
    [Property in keyof T as Exclude<Property, K>]: T[Property];
};

/** Removes the properties defined in P from T to be readonly, other properties will be ignored */
export type ReduceReadonly<T, P extends KeyofType<T>> = {
    -readonly [Property in P]: T[Property];
} & { [Property in keyof T]: T[Property] };

/** Returns the type provided in T as an array */
export type ToArray<T> = T extends any ? T[] : never;

/** The fetch type used for fetching specific items for the guild formatting. */
export type FetchType =  "name" | "mention";

/** The destination type of where to execute the permissions for. */
export type DestinationType =
    | "role"
    | "channel";

/** The type of user you wish to use.  */
export type UserType =
    | "user"
    | "client";

/** The sort of owner you want to get/use. */
export type OwnerType =
    | "owner"
    | "developer";