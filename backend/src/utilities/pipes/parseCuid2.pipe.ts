import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import * as z from 'zod';

const cuid2Schema = z.cuid2();

export class ParseCuid2Pipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const parseResult = cuid2Schema.safeParse(value);

    if (!parseResult.success) {
      throw new BadRequestException(`
			Invalid ${metadata.data}: must be a valid CUID2`);
    }

    return parseResult.data;
  }
}
