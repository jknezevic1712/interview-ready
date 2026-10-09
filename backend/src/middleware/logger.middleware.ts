import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: any, res: any, next: (error?: any) => void) {
		console.log('REQUEST');
		console.log({
			headers: req?.rawHeaders,
			url: req?.url,
			method: req?.method,
			baseUrl: req?.baseUrl,
			cookies: req?.cookies,
		});
		next();
	}
}
