import { TextBasedChannel, DMChannel, PartialDMChannel, PartialGroupDMChannel, ChannelType } from "discord.js";

export type TextBasedChannels = Exclude<TextBasedChannel, DMChannel | PartialDMChannel | PartialGroupDMChannel>;

export type ChannelTypes =
    | ChannelType.GuildText
    | ChannelType.GuildVoice
    | ChannelType.GuildCategory
    | ChannelType.GuildAnnouncement
    | ChannelType.AnnouncementThread
    | ChannelType.PublicThread
    | ChannelType.PrivateThread
    | ChannelType.GuildStageVoice
    | ChannelType.GuildForum;