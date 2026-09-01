import { HttpStatus, type INestApplication } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import { buildCategoryResponse } from 'src/common/builders/categories/categoryResponse.builder';
import { buildGetUserResponse } from 'src/common/builders/users/getUserResponse.builder';
import { CategoryResponse } from 'src/common/dtos/categories/categoryResponse.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Role } from 'src/common/types/enums';
import { TokenService } from 'src/features/authentication/services/token.service';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, Mocked, vi } from 'vitest';
import { CategoriesService } from '../services/categories.service';
import { CategoriesController } from './categories.controller';

describe('CategoriesController', () => {
	let app: INestApplication;

	let tokenService: TokenService;
	let categoriesService: Omit<
		Mocked<CategoriesService>,
		'categoriesRepository'
	>;

	const categoriesMockData = [
		buildCategoryResponse()
			.withId('1')
			.withName('Cat 1')
			.withSlug('cat-1')
			.build(),
		buildCategoryResponse()
			.withId('2')
			.withName('Cat 2')
			.withSlug('cat-2')
			.build(),
	];

	const standardUser = buildGetUserResponse().withRole(Role.USER).build();
	const adminUser = buildGetUserResponse().withRole(Role.ADMIN).build();

	let standardUserAccessToken = '';
	let adminUserAccessToken = '';

	async function createTokens() {
		const { accessToken: adminUserAccToken } =
			await tokenService.generateTokens({
				sub: adminUser.id,
				role: adminUser.role,
				sessionId: adminUser.sessionId,
			});
		adminUserAccessToken = adminUserAccToken;

		const { accessToken: standardUserAccToken } =
			await tokenService.generateTokens({
				sub: standardUser.id,
				role: standardUser.role,
				sessionId: standardUser.sessionId,
			});
		standardUserAccessToken = standardUserAccToken;
	}

	function createCategoriesServiceMocks(): typeof categoriesService {
		return {
			getAll: vi
				.fn()
				.mockResolvedValue(
					categoriesMockData satisfies Awaited<
						ReturnType<typeof categoriesService.getAll>
					>,
				),

			getById: vi
				.fn()
				.mockResolvedValue(
					categoriesMockData[0] satisfies Awaited<
						ReturnType<typeof categoriesService.getById>
					>,
				),
		};
	}

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [CategoriesController],
			providers: [
				JwtService,
				TokenService,
				Reflector,
				{
					provide: APP_GUARD,
					useClass: AuthenticationGuard,
				},
				{
					provide: APP_GUARD,
					useClass: AuthorizationGuard,
				},
			],
		})
			.useMocker((token) => {
				if (token === CategoriesService) {
					return createCategoriesServiceMocks();
				}
			})
			.compile();

		app = moduleRef.createNestApplication();
		app.use(cookieParser());

		await app.init();

		categoriesService = moduleRef.get(CategoriesService);
		tokenService = moduleRef.get(TokenService);

		await createTokens();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('Admin user', () => {
		beforeAll(() => {
			vi.clearAllMocks();
		});

		it('should return categories', async () => {
			const response = await request(app.getHttpServer())
				.get('/categories')
				.set('Authorization', `Bearer ${adminUserAccessToken}`)
				.expect(HttpStatus.OK);

			expect(categoriesService.getAll).toHaveBeenCalledOnce();
			expect(response.body).toEqual<CategoryResponse[]>([
				{
					id: categoriesMockData[0].id,
					name: categoriesMockData[0].name,
					slug: categoriesMockData[0].slug,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				},
				{
					id: categoriesMockData[1].id,
					name: categoriesMockData[1].name,
					slug: categoriesMockData[1].slug,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				},
			]);
		});

		it(`should return category by id`, async () => {
			const response = await request(app.getHttpServer())
				.get(`/categories/${categoriesMockData[0].id}`)
				.set('Authorization', `Bearer ${adminUserAccessToken}`)
				.expect(HttpStatus.OK);

			expect(categoriesService.getById).toHaveBeenCalledOnce();
			expect(response.body).toEqual<CategoryResponse>({
				id: categoriesMockData[0].id,
				name: categoriesMockData[0].name,
				slug: categoriesMockData[0].slug,
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
			});
		});
	});

	describe('Standard user', () => {
		beforeAll(() => {
			vi.clearAllMocks();
		});

		it('should return categories', async () => {
			const response = await request(app.getHttpServer())
				.get('/categories')
				.set('Authorization', `Bearer ${standardUserAccessToken}`)
				.expect(HttpStatus.OK);

			expect(categoriesService.getAll).toHaveBeenCalledOnce();
			expect(response.body).toEqual<CategoryResponse[]>([
				{
					id: categoriesMockData[0].id,
					name: categoriesMockData[0].name,
					slug: categoriesMockData[0].slug,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				},
				{
					id: categoriesMockData[1].id,
					name: categoriesMockData[1].name,
					slug: categoriesMockData[1].slug,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				},
			]);
		});

		it(`should throw ${HttpStatus.FORBIDDEN} when trying to fetch category by id`, async () => {
			await request(app.getHttpServer())
				.get(`/categories/${categoriesMockData[0].id}`)
				.set('Authorization', `Bearer ${standardUserAccessToken}`)
				.expect(HttpStatus.FORBIDDEN);

			expect(categoriesService.getById).not.toHaveBeenCalled();
		});
	});
});
