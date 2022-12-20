// The package required for the database
import { QuickDB } from "quick.db";

// The files required for the database
import {
	CheckFor,
	IDatabase
} from "@lib";


// The object used for the database
export const Database = (): IDatabase => {
	const db = new QuickDB();

	return {
		all: async () => await db.all(),
		math: {
			add: async (key: string, toAdd: number): Promise<void> => {
				CheckFor.BadKey(key);
				await db.add(key, toAdd);
			},
			devide: async (key: string, toDevide: number): Promise<void> => {
				CheckFor.BadKey(key);

				let old = await db.get(key) as number;
				old = old / toDevide;
				await db.set(key, old);
			},
			multiply: async (key: string, toMultiply: number): Promise<void> => {
				CheckFor.BadKey(key);

				let old = await db.get(key) as number;
				old = old * toMultiply;
				await db.set(key, old);
			},
			substract: async (key: string, toSubstract: number): Promise<void> => {
				CheckFor.BadKey(key);
				await db.sub(key, toSubstract);
			}
		},
		core: {
			contains: async (key: string): Promise<boolean> => {
				CheckFor.BadKey(key);

				return await db.has(key);
			},
			delete: async (key: string): Promise<void> => {
				CheckFor.BadKey(key);
				await db.delete(key);
			},
			drop: async (): Promise<void> => {
				await db.deleteAll();
			},
			get: async <T>(key: string, defaultValue: T): Promise<T> => {
				CheckFor.BadKey(key);

				const containsK = await db.has(key);
				if (!containsK) {
					await db.set(key, defaultValue);

					return defaultValue;
				}

				return await db.get(key) as T;
			},
			push: async <T>(key: string, value: any | any[]): Promise<T[]> => {
				CheckFor.BadKey(key);

				return await db.push(key, value);
			},
			pull: async <T>(key: string, value: any | any[] | ((data: any) => boolean)): Promise<T[]> => {
				CheckFor.BadKey(key);

				return await db.pull(key, value);
			},
			set: async <T>(key: string, value: T): Promise<T> => {
				CheckFor.BadKey(key);
				CheckFor.BadDevider(key, true);

				return await db.set(key, value) as Promise<T>;
			}
		},
		prefix: async (guildID: string): Promise<string> => {
			const prefixKey = `${guildID}.prefix`;
			const hasPrefix = await db.has(prefixKey);

			if (!hasPrefix) {
				await db.set<string>(prefixKey, "f!");

				return await db.get<string>(prefixKey) as string;
			}

			return await db.get<string>(prefixKey) as string;
		}
	}
};