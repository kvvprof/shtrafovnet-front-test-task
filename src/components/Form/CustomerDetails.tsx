import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { UIDisclosure } from '../UI/UIDisclosure';
import { UIFormInput } from '../UI/UIFormInput';
import { FormLayout } from './FormLayout';
import { useFormStore } from '@/stores/formStore';
import { CustomerDetailsType } from '@/types/formType';

export const CustomerDetails = () => {
	const isSubmitted = useFormStore((state) => state.isSubmitted);
	const setIsSubmitted = useFormStore((state) => state.setIsSubmitted);

	const customerDetails = useFormStore((state) => state.customerDetails);
	const setCustomerDetails = useFormStore((state) => state.setCustomerDetails);

	const formik = useFormik<CustomerDetailsType>({
		initialValues: {
			customerName: customerDetails.customerName,
			customerEmail: customerDetails.customerEmail,
			deferralDays: customerDetails.deferralDays,
			creditLimit: customerDetails.creditLimit,
			isValid: customerDetails.isValid
		},
		validationSchema: Yup.object().shape({
			customerName: Yup.string().required('Введите имя'),
			customerEmail: Yup.string().required('Введите email'),
			deferralDays: Yup.number()
				.min(0, 'Поле должно быть больше или равно 0')
				.required('Поле обязательно к заполнению'),
			creditLimit: Yup.number().min(0, 'Поле должно быть больше или равно 0').required('Поле обязательно к заполнению')
		}),
		onSubmit: (values) => {
			setCustomerDetails({ ...values, isValid: true });
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
			<UIDisclosure title='Детали клиента'>
				<UIFormInput
					label='Имя'
					name='customerName'
					type='text'
					value={formik.values.customerName}
					isError={formik.errors.customerName && formik.touched.customerName ? true : false}
					errorMessage={formik.errors.customerName}
					onChange={(e) => {
						formik.handleChange(e);
						setCustomerDetails({ ...customerDetails, customerName: e.target.value });
					}}
				/>

				<UIFormInput
					label='Email'
					name='customerEmail'
					type='email'
					value={formik.values.customerEmail}
					isError={formik.errors.customerEmail && formik.touched.customerEmail ? true : false}
					errorMessage={formik.errors.customerEmail}
					onChange={(e) => {
						formik.handleChange(e);
						setCustomerDetails({ ...customerDetails, customerEmail: e.target.value });
					}}
				/>

				<UIFormInput
					label='Дней отсрочки'
					name='deferralDays'
					type='number'
					value={formik.values.deferralDays}
					isError={formik.errors.deferralDays && formik.touched.deferralDays ? true : false}
					errorMessage={formik.errors.deferralDays}
					onChange={(e) => {
						formik.handleChange(e);
						setCustomerDetails({ ...customerDetails, deferralDays: +e.target.value });
					}}
				/>

				<UIFormInput
					label='Кредитный лимит'
					name='creditLimit'
					type='number'
					value={formik.values.creditLimit}
					isError={formik.errors.creditLimit && formik.touched.creditLimit ? true : false}
					errorMessage={formik.errors.creditLimit}
					onChange={(e) => {
						formik.handleChange(e);
						setCustomerDetails({ ...customerDetails, creditLimit: +e.target.value });
					}}
				/>
			</UIDisclosure>
		</FormLayout>
	);
};
