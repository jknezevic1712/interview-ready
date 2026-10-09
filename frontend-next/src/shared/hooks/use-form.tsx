'use client';

import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { lazy } from 'react';
import { FormSubscribeButton as SubscribeButton } from '../components/molecules/form/form-subscribe-button';

const TextField = lazy(
	() => import('../components/molecules/form/form-text-field'),
);

const { fieldContext, useFieldContext, formContext, useFormContext } =
	createFormHookContexts();

const { useAppForm, withForm, withFieldGroup } = createFormHook({
	fieldComponents: {
		TextField,
	},
	formComponents: {
		SubscribeButton,
	},
	fieldContext,
	formContext,
});

export {
	useAppForm,
	useFieldContext,
	useFormContext,
	withFieldGroup,
	withForm,
};
