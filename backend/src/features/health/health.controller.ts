import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

import type { HealthResponse } from 'src/common/dtos/health/healthResponse.dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
	@Public()
	@Get()
	check(): HealthResponse {
		return { status: 'ok' };
	}
}
