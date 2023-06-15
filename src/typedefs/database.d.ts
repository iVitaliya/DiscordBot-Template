export interface IAFK {
    userID: string;
    reason: string;
    startedAt: number | string;
}

export interface ILevel {
    userID: string;
    messages: number;
    level: number;
    prestige: number;
    canPrestige: boolean;
}