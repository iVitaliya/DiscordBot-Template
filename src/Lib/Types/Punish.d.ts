export interface WarnLog {
    user: string;
    mod: string;
    reason: string;
    silent: string;
    at: string;
}

export interface MuteLog {
    user: string;
    mod: string;
    reason: string;
    duration?: number;
    silent: string;
    type: "TEMP" | "PERM";
    at: string;
}

export interface UnmuteLog {
    user: string;
    mod: string;
    reason: string;
    silent: string;
    at: string;
}

export interface KickLog {
    user: string;
    mod: string;
    reason: string;
    silent: string;
    at: string;
}

export interface BanLog {
    user: string;
    mod: string;
    reason: string;
    silent: string;
    type: "SOFT-BAN" | "TEMP-BAN" | "PRE-BAN" | "PERM-BAN";
    at: string;
}

export interface UnbanLog {
    user: string;
    mod: string;
    reason: string;
    silent: string;
    at: string;
}