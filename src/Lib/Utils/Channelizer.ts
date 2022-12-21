import { Constants } from "@lib";


type ChannelTypes = "category" | "store" | "news" | "text" | "thread" | "voice";

function ChannelText(channel_name: string, channel_id: string): string {
    return `**${channel_name}** (\`${channel_id}\`)`;
}

export const Channelizer = (channel_type: ChannelTypes, channel_name: string, channel_id: string) => {
    let str = ``;

    switch (channel_type) {
        case "category":
            str = `${Constants.EMOJIS.channel_category} ${ChannelText(channel_name, channel_id)}`;
            break;
        case "store":
            str = `${Constants.EMOJIS.channel_store} ${ChannelText(channel_name, channel_id)}`;
            break;
        case "news":
            str = `${Constants.EMOJIS.channel_news} ${ChannelText(channel_name, channel_id)}`;
            break;
        case "text":
            str = `${Constants.EMOJIS.channel_text} ${ChannelText(channel_name, channel_id)}`;
            break;
        case "thread":
            str = `${Constants.EMOJIS.channel_thread} ${ChannelText(channel_name, channel_id)}`;
            break;
        case "voice":
            str = `${Constants.EMOJIS.channel_voice} ${ChannelText(channel_name, channel_id)}`;
            break;
    }

    return str;
};