import { EmailsType } from '@/types/formType';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { UIDisclosure } from '../UI/UIDisclosure';
import { UISecondaryBtn } from '../UI/UIButtons/UISecondaryBtn';
import { FormLayout } from './FormLayout';
import { UIFormInput } from '../UI/UIFormInput';
import { UIDeleteBtn } from '../UI/UIButtons/UIDeleteBtn';
import { useFormStore } from '@/stores/formStore';

const Email = (props: EmailsType) => {
	const { id, email, isValid } = props;

	const isSubmitted = useFormStore((state) => state.isSubmitted);
	const setIsSubmitted = useFormStore((state) => state.setIsSubmitted);

	const updateEmail = useFormStore((state) => state.updateEmail);
	const deleteEmail = useFormStore((state) => state.deleteEmail);

	const formik = useFormik<EmailsType>({
		initialValues: {
			id: id,
			email: email,
			isValid: isValid
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().required('Введите email')
		}),
		onSubmit: (values) => {
			updateEmail({ ...values, isValid: true });
		}
	});

	useEffect(() => {
		if (isSubmitted) {
			formik.handleSubmit();
		}

		if (!formik.isValid) {
			setIsSubmitted(false);
		}
	}, [isSubmitted]);

	return (
		<FormLayout>
			{id !== 1 && <UIDeleteBtn className='absolute right-0 top-[-10px]' onClick={() => deleteEmail(props)} />}
			<UIFormInput
				label='Email'
				name='email'
				type='email'
				value={formik.values.email}
				isError={formik.errors.email && formik.touched.email ? true : false}
				errorMessage={formik.errors.email}
				onChange={(e) => {
					formik.handleChange(e);
					updateEmail({ ...props, email: e.target.value });
				}}
			/>
		</FormLayout>
	);
};

export const Emails = () => {
	const emails = useFormStore((state) => state.emails);
	const setEmail = useFormStore((state) => state.setEmail);

	return (
		<UIDisclosure title='Emails для счетов'>
			<div className='flex flex-col gap-8'>
				{emails.map((email) => (
					<Email key={email.id} {...email} />
				))}
			</div>

			<UISecondaryBtn width={'100%'} name='Добавить email' onClick={setEmail} />
		</UIDisclosure>
	);
};
