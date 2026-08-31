import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

import type { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
	constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

	async get<T>(key: string): Promise<T | undefined> {
		try {
			return this.cacheManager.get<T>(key);
		} catch (error) {
			console.error(`Error occurred while fetching cache: ${error}`);
		}
	}

	async set<T>(key: string, value: T, ttl?: number): Promise<void> {
		try {
			await this.cacheManager.set(key, value, ttl);
		} catch (error) {
			console.error(`Error occurred while setting cached value ${error}`);
		}
	}

	async del(key: string): Promise<void> {
		try {
			await this.cacheManager.del(key);
		} catch (error) {
			console.error(`Error occurred while deleting cached value ${error}`);
		}
	}
}
