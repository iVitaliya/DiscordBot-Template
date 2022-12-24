// The class
import {
	Client, Collection, GatewayIntentBits,
	GuildBan, GuildEmoji, GuildMember,
	LifetimeSweepOptions, MessageReaction,
	Partials, Presence, REST, Routes,
	StageInstance, Sticker, SweepOptions,
	ThreadMember, User, VoiceState
} from "discord.js";

import {
	ArrayFormat, BanLog, ChannelFetcher,
	Command, CommandFetcher, Config, Database,
	Embed, EmojiFetcher, GuildFetcher,
	GuildFormat, GuildMemberFetcher, IDatabase,
	ISlashCommand, KickLog, Logger, MuteLog,
	PermissionFormat, Processor, RoleFetcher,
	StringFormat, UserFetcher, WarnLog
} from "@lib";
import { readdirSync } from "fs";
import { join, resolve } from "path";
import pkg from "../../../package.json";


function Sweeper() {
	return {
		message: { lifetime: 3000, interval: 10300 } as LifetimeSweepOptions,
		invite: { lifetime: 1000, interval: 10500 } as LifetimeSweepOptions,
		ban: { interval: 8000, filter: (b: GuildBan, _key: string, _collection: Collection<string, GuildBan>) => !b.user.bot } as unknown as SweepOptions<string, GuildBan>,
		reaction: { interval: 3000 } as SweepOptions<string, MessageReaction>,
		guildMember: { interval: 3500, filter: (m: GuildMember, _key: string, _collection: Collection<string, GuildMember>) => !m.user.bot } as unknown as SweepOptions<string, GuildMember>,
		user: { interval: 5000, filter: (u: User, _key: string, _collection: Collection<string, User>) => !u.bot } as unknown as SweepOptions<string, User>,
		voiceState: { interval: 1500 } as SweepOptions<string, VoiceState>,
		presence: { interval: 1000 } as SweepOptions<string, Presence>,
		threadMember: { interval: 10000 } as SweepOptions<string, ThreadMember>,
		thread: { lifetime: 1000, interval: 1500 } as LifetimeSweepOptions,
		stageInstance: { interval: 1300 } as SweepOptions<string, StageInstance>,
		emoji: { interval: 1200 } as SweepOptions<string, GuildEmoji>,
		sticker: { interval: 950 } as SweepOptions<string, Sticker>
	};
}

enum DiscordColors {
	BASE = '00ff81',
	WARN = 'f0f725',
	MUTE = '2560f7',
	KICK = 'f79525',
	BAN = 'f73625',
	BUGS = '777d84',
	ERROR = 'f2594b'
}

interface Formatting {
	string: typeof StringFormat;
	array: typeof ArrayFormat;
	guild: typeof GuildFormat;
	permission: typeof PermissionFormat;
}

interface Fetchers {
	channel: typeof ChannelFetcher;
	command: typeof CommandFetcher;
	emoji: typeof EmojiFetcher;
	guild: typeof GuildFetcher;
	member: typeof GuildMemberFetcher;
	role: typeof RoleFetcher;
	user: typeof UserFetcher;
}

export class DiscordClient extends Client {
	public prefix: any;
	public swearWords: any;
	public blacklist: any;

	public db: () => IDatabase = Database;

	public colors: typeof DiscordColors = DiscordColors;
	public cooldownCount: Map<string, number> = new Map<string, number>();
	public cooldown: Map<string, Collection<string, number>> = new Map<string, Collection<string, number>>();
	public commands: Collection<string, Command>;
	public slashCommands: Collection<string, ISlashCommand> = new Collection();

	public embed: typeof Embed = Embed;
	public logger: Logger = new Logger();
	public package = pkg;
	public format = {} as Formatting;
	public fetch = {} as Fetchers;
	public capitalise = (str: string) => str.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');

	public caches = {
		invites: new Collection<string, Collection<string, NodeJS.Timeout>>(),
		warns: new Collection<string, WarnLog>(),
		mutes: new Collection<string, MuteLog>(),
		kicks: new Collection<string, KickLog>(),
		bans: new Collection<string, BanLog>()
	};

	public constructor() {
		super({
			intents: [
				GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.AutoModerationExecution,
				GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildInvites,
				GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildPresences, GatewayIntentBits.Guilds, GatewayIntentBits.GuildScheduledEvents,
				GatewayIntentBits.GuildWebhooks, GatewayIntentBits.MessageContent
			],
			partials: [
				Partials.Channel,
				Partials.GuildMember,
				Partials.Message,
				Partials.Reaction,
				Partials.User
			],
			sweepers: {
				messages: Sweeper().message,
				invites: Sweeper().invite,
				bans: Sweeper().ban,
				reactions: Sweeper().reaction,
				guildMembers: Sweeper().guildMember,
				users: Sweeper().user,
				voiceStates: Sweeper().voiceState,
				presences: Sweeper().presence,
				threadMembers: Sweeper().threadMember,
				threads: Sweeper().thread,
				stageInstances: Sweeper().stageInstance,
				emojis: Sweeper().emoji,
				stickers: Sweeper().sticker
			}
		});

		new Processor(this).listeners();
		this.initiateSlashCommands();
		this.commands = new Processor(this).commands();

		this.format.string = StringFormat;
		this.format.array = ArrayFormat;
		this.format.permission = PermissionFormat;
		this.format.guild = GuildFormat;

		this.fetch.channel = ChannelFetcher;
		this.fetch.command = CommandFetcher;
		this.fetch.emoji = EmojiFetcher;
		this.fetch.guild = GuildFetcher;
		this.fetch.member = GuildMemberFetcher;
		this.fetch.role = RoleFetcher;
		this.fetch.user = UserFetcher;
	}

	public start(): void {
		const token = Config.get("TOKEN");
		if (!token) {
			throw new Error("No token was set in the .env file, please paste after TOKEN= the token, location: Configurations/.env");
		}

		super.login(token);
	}

	getSlashCommands() {
		const commands = [];
		const folders = readdirSync(resolve(__dirname));
		for (const folder of folders) {
			const files = readdirSync(resolve(join(__dirname, folder))).filter((f) => f.endsWith(".js"));
			for (const file of files) {
				const command = require(resolve(join(__dirname, folder, file)));
				const data = command.data;

				commands.push(data.toJSON());
				this.slashCommands.set(data.name, data);
			}
		}

		return commands;
	}

	initiateSlashCommands() {
		const commands = this.getSlashCommands();
		const rest = new REST({ version: '10' }).setToken(this.token!);

		(async () => {
			try {
				this.logger.info(`Started refreshing ${commands.length} application (/) commands.`);

				const data = await rest.put(
					Routes.applicationCommands(this.user!.id),
					{ body: commands }
				);

				// @ts-ignore It's seen as unkown which isn't really the case
				this.logger.info(`Successfully reloaded ${data.length} application (/) commands.`);
			} catch (err) {
				this.logger.fatal(err);
			}
		});
	}
}