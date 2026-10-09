import {
	registerDecorator,
	type ValidationArguments,
	type ValidationOptions,
} from 'class-validator';

export function IsStringOrNull(
	validationOptions?: ValidationOptions,
): PropertyDecorator {
	return (object: object, propertyName: string | symbol) => {
		registerDecorator({
			name: 'isStringOrNull',
			target: object.constructor,
			propertyName: propertyName.toString(),
			options: validationOptions,
			validator: {
				validate(value: unknown, _args: ValidationArguments) {
					return value === null || typeof value === 'string';
				},
				defaultMessage(args: ValidationArguments) {
					return `${args.property} must be a string or null`;
				},
			},
		});
	};
}
