import { 
    APIEmbed, 
    APIEmbedFooter, 
    APIEmbedImage, 
    APIEmbedThumbnail, 
    APIEmbedVideo, 
    APIEmbedProvider, 
    APIEmbedAuthor, 
    APIEmbedField 
} from "discord.js";
import moment from "moment";

import {
	EmbedTypes,
	EmbedThemes
} from "@lib";


interface ITheme {
	title: string;
	theme: EmbedTypes;
}

const EmbedLimits = {
	author: {
		name: 256
	},
	title: 256,
	description: 4096,
	footer: {
		text: 2048
	},
	field: {
		name: 256,
		value: 1024
	},
	fields: 25
};

export class Embed implements APIEmbed {
	/**
	 * Title of embed
	 *
	 * Length limit: 256 characters
	 */
	title?: string;
	/**
	 * Description of embed
	 *
	 * Length limit: 4096 characters
	 */
	description?: string;
	/**
	 * URL of embed
	 */
	url?: string;
	/**
	 * Timestamp of embed content
	 */
	timestamp?: string;
	/**
	 * Color code of the embed
	 */
	color?: number;
	/**
	 * Footer information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure
	 */
	footer?: APIEmbedFooter;
	/**
	 * Image information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure
	 */
	image?: APIEmbedImage;
	/**
	 * Thumbnail information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure
	 */
	thumbnail?: APIEmbedThumbnail;
	/**
	 * Video information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure
	 */
	video?: APIEmbedVideo;
	/**
	 * Provider information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure
	 */
	provider?: APIEmbedProvider;
	/**
	 * Author information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure
	 */
	author?: APIEmbedAuthor;
	/**
	 * Fields information
	 *
	 * Length limit: 25 field objects
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure
	 */
	fields?: APIEmbedField[];

	/**
	 * Author information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure
	 */
	public setAuthor(data: APIEmbedAuthor): Embed {
		this.author = {
			name: (data.name.length > EmbedLimits.author.name) ? data.name.slice(0, EmbedLimits.author.name) : data.name,
			url: data.url,
			icon_url: data.icon_url,
			proxy_icon_url: data.proxy_icon_url
		};

		return this;
	}

	/**
	 * Thumbnail information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure
	 */
	public setThumbnail(url: string): Embed {
		this.thumbnail = {
			url: url
		};

		return this;
	}

	/**
	 * Title of embed
	 *
	 * Length limit: 256 characters
	 */
	public setTitle(title: string): Embed {
		this.title = (title.length > EmbedLimits.title) ? title.slice(0, EmbedLimits.title) : title;

		return this;
	}

	/**
	 * Description of embed
	 *
	 * Length limit: 4096 characters
	 */
	public setDescription(description: string): Embed {
		this.description = (description.length > EmbedLimits.description) ? description.slice(0, EmbedLimits.description) : description;

		return this;
	}

	/**
	 * Image information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure
	 */
	public setImage(url: string): Embed {
		this.image = {
			url: url
		};

		return this
	}

	/**
	 * Video information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure
	 */
	public setVideo(url: string): Embed {
		this.video = {
			url: url
		};

		return this;
	}

	/**
	 * URL of embed
	 */
	public setURL(url: string): Embed {
		this.url = url;

		return this;
	}

	/**
	 * Fields information
	 *
	 * Length limit: 25 field objects
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure
	 */
	public addField(data: APIEmbedField): Embed {
		if (this.fields!.length === EmbedLimits.fields) {
			throw new Error(`The provided Embed already has ${EmbedLimits.fields} fields and thus you can't add any more fields as ${EmbedLimits.fields} is the maximum amount of fields you can assign to an embed!`);
		}

		this.fields!.push(data);

		return this;
	}

	/**
	 * Fields information
	 *
	 * Length limit: 25 field objects
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure
	 */
	public setFields(data: APIEmbedField[]): Embed {
		if (this.fields!.length === EmbedLimits.fields) {
			throw new Error(`The provided Embed already has ${EmbedLimits.fields} fields and thus you can't add any more fields as ${EmbedLimits.fields} is the maximum amount of fields you can assign to an embed!`);
		} else if (data.length > EmbedLimits.fields) {
			throw new Error(`You can't add more than ${EmbedLimits.fields} to an embed!`);
		}

		for (let i = 0; i < data.length; i++) {
			this.fields!.push({
				name: (data[i]!.name.length > EmbedLimits.field.name) ? data[i]!.name.slice(0, EmbedLimits.field.name) : data[i]!.name,
				value: (data[i]!.value.length > EmbedLimits.field.value) ? data[i]!.value.slice(0, EmbedLimits.field.value) : data[i]!.value,
				inline: data[i]!.inline
			});
		}

		return this;
	}

	/**
	 * Sets the theme of the embed
	 */
	public setTheme(data: ITheme): Embed {
		const d = EmbedThemes[data.theme];

		this.setAuthor({ name: data.title, icon_url: d.icon });
		this.setColor(Number(d.color.replace("#", "0x")));

		return this;
	}

	/**
	 * Color code of the embed
	 */
	public setColor(color: string | number): Embed {
		this.color = (typeof color === "string") ? Number(color.replace("#", "0x")) : color;

		return this;
	}

	/**
	 * Footer information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure
	 */
	public setFooter(data: APIEmbedFooter): Embed {
		this.footer = {
			text: (data.text.length > EmbedLimits.footer.text) ? data.text.slice(0, EmbedLimits.footer.text) : data.text,
			icon_url: data.icon_url,
			proxy_icon_url: data.proxy_icon_url
		};

		return this;
	}

	/**
	 * Timestamp of embed content
	 */
	public setTimestamp(): Embed {
		this.timestamp = moment(Date.now()).format("Do [of] MMMM YYYY");

		return this;
	}

	/**
	 * Provider information
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure
	 */
	public setProvider(data: APIEmbedProvider): Embed {
		this.provider = {
			name: data.name,
			url: data.url
		};

		return this;
	}

	public build(): APIEmbed {
		return {
			author: this.author,
			thumbnail: this.thumbnail,
			title: this.title,
			description: this.description,
			image: this.image,
			video: this.video,
			url: this.url,
			fields: this.fields,
			color: this.color,
			footer: this.footer,
			timestamp: this.timestamp,
			provider: this.provider  
		};  
	}  
}