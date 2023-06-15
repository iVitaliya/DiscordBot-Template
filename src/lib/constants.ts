import { join, resolve } from "path";
import type { IEmbedTypes } from "./index";

// This will be our workspace directory, in other words, where the package.json file is located.
export const rootDir = resolve(join(process.cwd()));
// This will be used for our resolving of commands or events or other needed functionality.
export const srcDir = resolve(join(rootDir, "dist"));

// The name for the bot.
export const BotName = "Template-Bot";
// Like the variable name says, these are messages which will be used upon loading certain things for example fetching ping or processing GIFs. 
export const RandomLoadingMessage = ["Computing...", "Thinking...", "Cooking some food", "Give me a moment", "Loading..."];

// Reasons to use for certain things.
export const Reasons = {
    "afk_started": (
        member: {
            username: string;
            id: string;
        },
        reason?: string
    ) => `(${BotName}) User Went AFK | User: ${member.username} (${member.id})${!reason ? "" : ` | Reason: ${reason}`}`,
    "afk_ended": (
        member: {
            username: string;
            id: string;
        },
        reason: string,
        startedAt: string
    ) => `(${BotName}) AFK Removal | User: ${member.username} (${member.id}) | Reason: ${reason} | Started: ${startedAt}`,
    "nickname_reset": (
        member: {
            username: string;
            id: string;
        },
        reason: string
    ) => `(${BotName}) Nickname Reset | User: ${member.username} (${member.id}) | Reason: ${reason}`
};

export enum Colors {
    Main = "#002afc",
    
    Cancel = "#ef3f4c",
    Pushing = "#2bb4eb",
    Blocked = "#a83b35",
    Failed = "#e82b3a",

    LowLatency = "#0f89e3",
    NormalLatency = "#0e6cf9",
    HighLatency = "#0e2af9",

    LowRisk = "#f2d100",
    MediumRisk = "#ff490c",
    HighRisk = "#ff200c",

    ToggleOff = "#e92d3b",
    ToggleOn = "#00d300",

    Settings = "#a6a6a8",
    Guilds = "#42a4ee",
    Bugs = "#a6a7ab"
}

export enum Icons {
    Success = "https://i.imgur.com/It9BNU8.png",
    Cancel = "https://i.imgur.com/U3HAPvp.png",
    Pushing = "https://i.imgur.com/tJgejcp.png",
    Blocked = "https://i.imgur.com/vlm4o6f.png",
    Failed = "https://i.imgur.com/HndJ0gv.png",

    LowLatency = "https://i.imgur.com/7Bi1miT.png",
    NormalLatency = "https://i.imgur.com/z4XR5BO.png",
    HighLatency = "https://i.imgur.com/uHZs7oz.png",

    LowRisk = "https://i.imgur.com/lQCdrh4.png",
    MediumRisk = "https://i.imgur.com/kGHdqBL.png",
    HighRisk = "https://i.imgur.com/Hc6OSpu.png",

    ToggleOff = "https://i.imgur.com/jMlPD2R.png",
    ToggleOn = "https://i.imgur.com/FLhQrUS.png",

    Settings = "https://i.imgur.com/BxFXaRr.png",
    Guilds = "https://i.imgur.com/xDR7eBr.png",
    Bugs = "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_bug_report_48px-256.png"
}

export const EmbedThemes: IEmbedTypes = {
    Main: {
        icon: Icons.Success,
        color: Colors.Main
    },

    Cancel: {
        icon: Icons.Cancel,
        color: Colors.Failed
    },
    Pushing: {
        icon: Icons.Pushing,
        color: Colors.Pushing
    },
    Blocked: {
        icon: Icons.Blocked,
        color: Colors.Blocked
    },
    Failed: {
        icon: Icons.Failed,
        color: Colors.Cancel
    },

    LowLatency: {
        icon: Icons.LowLatency,
        color: Colors.LowLatency
    },
    NormalLatency: {
        icon: Icons.NormalLatency,
        color: Colors.NormalLatency
    },
    HighLatency: {
        icon: Icons.HighLatency,
        color: Colors.HighLatency
    },

    LowRisk: {
        icon: Icons.LowRisk,
        color: Colors.LowRisk
    },
    MediumRisk: {
        icon: Icons.MediumRisk,
        color: Colors.MediumRisk
    },
    HighRisk: {
        icon: Icons.HighRisk,
        color: Colors.HighRisk
    },

    ToggleOff: {
        icon: Icons.ToggleOff,
        color: Colors.ToggleOff
    },
    ToggleOn: {
        icon: Icons.ToggleOn,
        color: Colors.ToggleOn
    },

    Settings: {
        icon: Icons.Settings,
        color: Colors.Settings
    },
    Guilds: {
        icon: Icons.Guilds,
        color: Colors.Guilds
    },
    Bugs: {
        icon: Icons.Bugs,
        color: Colors.Bugs
    }
};