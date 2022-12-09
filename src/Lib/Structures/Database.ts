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

				return;
			},
			devide: async (key: string, toDevide: number): Promise<void> => {
				CheckFor.BadKey(key);

				let old = await db.get(key) as unknown as number;
				old = old / toDevide;
				await db.set(key, old);

				return;
			},
			multiply: async (key: string, toMultiply: number): Promise<void> => {
				CheckFor.BadKey(key);

				let old = await db.get(key) as unknown as number;
				old = old * toMultiply;
				await db.set(key, old);

				return;
			},
			substract: async (key: string, toSubstract: number): Promise<void> => {
				CheckFor.BadKey(key);
				await db.sub(key, toSubstract);

				return;
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

				return;
			},
			drop: async (): Promise<void> => {
				await db.deleteAll()

				return;
			},
			get: async <T>(key: string, defaultValue: T): Promise<T> => {
				CheckFor.BadKey(key);

				let containsK = await db.has(key);
				if (!containsK) {
					await db.set(key, defaultValue);

					return defaultValue;
				}

				return await db.get(key) as T;
			},
			push: async <T>(key: string, value: any | any[]): Promise<T[]> => {
				CheckFor.BadKey(key);
				
				return db.push(key, value);
			},
			pull: async <T>(key: string, value: any | any[] | ((data: any) => boolean)): Promise<T[]> => {
				CheckFor.BadKey(key);

				return db.pull(key, value);
			},
			set: async <T>(key: string, value: T): Promise<T> => {
				CheckFor.BadKey(key);
				CheckFor.BadDevider(key, true);

				return db.set(key, value) as Promise<T>;
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