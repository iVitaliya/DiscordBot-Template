/** An interface used for creating an embed with several pages. */
export interface IPager<T extends any> {
    /** The array containing all the items wished to be displayed on the pages. */
    arr: T[];
    /** How many items per page should be displayed. */
    itemsPerPage: number;
    /** The page that the pager should be on (or going to) */
    page: number;
}

/** An interface used for the creation of Embed Themes. */
export interface IEmbedTypes {
    Main: { icon: string; color: string; };

    Cancel: { icon: string; color: string; };
    Pushing: { icon: string; color: string; };
    Blocked: { icon: string; color: string; };
    Failed: { icon: string; color: string; };

    LowLatency: { icon: string; color: string; };
    NormalLatency: { icon: string; color: string; };
    HighLatency: { icon: string; color: string; };

    LowRisk: { icon: string; color: string; };
    MediumRisk: { icon: string; color: string; };
    HighRisk: { icon: string; color: string; };

    ToggleOff: { icon: string; color: string; };
    ToggleOn: { icon: string; color: string; };

    Settings: { icon: string; color: string; };
    Guilds: { icon: string; color: string; };
    Bugs: { icon: string; color: string; };
}