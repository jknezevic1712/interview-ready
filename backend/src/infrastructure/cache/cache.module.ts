import { createKeyv } from '@keyv/valkey';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { env } from 'src/env';
import { CacheService } from './cache.service';

@Module({
	imports: [
		NestCacheModule.registerAsync({
			isGlobal: true,
			useFactory: () => ({
				stores: [createKeyv(env.DB_CACHE_URL)],
			}),
		}),
	],
	providers: [CacheService],
	exports: [CacheService],
})
export class CacheModule {}
