import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { UIDisclosure } from '../UI/UIDisclosure';
import { FormLayout } from './FormLayout';
import { UIFormInput } from '../UI/UIFormInput';
import { useFormStore } from '@/stores/formStore';
import { OrgDetailsType } from '@/types/formType';

export const OrgDetails = () => {
	const isSubmitted = useFormStore((state) => state.isSubmitted);
	const setIsSubmitted = useFormStore((state) => state.setIsSubmitted);

	const orgDetails = useFormStore((state) => state.orgDetails);
	const setOrgDetails = useFormStore((state) => state.setOrgDetails);

	const formik = useFormik<OrgDetailsType>({
		initialValues: {
			orgName: orgDetails.orgName,
			inn: orgDetails.inn,
			kpp: orgDetails.kpp,
			ogrn: orgDetails.ogrn,
			orgAddr: orgDetails.orgAddr,
			isValid: orgDetails.isValid
		},
		validationSchema: Yup.object().shape({
			orgName: Yup.string().required('Введите название организации'),
			inn: Yup.string().required('Введите ИНН организации'),
			kpp: Yup.string().required('Введите КПП организации'),
			ogrn: Yup.string().required('Введите ОГРН организации'),
			orgAddr: Yup.string().required('Введите юридический адрес')
		}),
		onSubmit: (values) => {
			setOrgDetails({ ...values, isValid: true });
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
			<UIDisclosure title='Детали организации'>
				<UIFormInput
					label='Название организации'
					name='orgName'
					type='text'
					value={formik.values.orgName}
					isError={formik.errors.orgName && formik.touched.orgName ? true : false}
					errorMessage={formik.errors.orgName}
					onChange={(e) => {
						formik.handleChange(e);
						setOrgDetails({ ...orgDetails, orgName: e.target.value });
					}}
				/>

				<UIFormInput
					label='ИНН организации'
					name='inn'
					type='text'
					value={formik.values.inn}
					isError={formik.errors.inn && formik.touched.inn ? true : false}
					errorMessage={formik.errors.inn}
					onChange={(e) => {
						formik.handleChange(e);
						setOrgDetails({ ...orgDetails, inn: e.target.value });
					}}
				/>

				<UIFormInput
					label='КПП организации'
					name='kpp'
					type='text'
					value={formik.values.kpp}
					isError={formik.errors.kpp && formik.touched.kpp ? true : false}
					errorMessage={formik.errors.kpp}
					onChange={(e) => {
						formik.handleChange(e);
						setOrgDetails({ ...orgDetails, kpp: e.target.value });
					}}
				/>

				<UIFormInput
					label='ОГРН организации'
					name='ogrn'
					type='text'
					value={formik.values.ogrn}
					isError={formik.errors.ogrn && formik.touched.ogrn ? true : false}
					errorMessage={formik.errors.ogrn}
					onChange={(e) => {
						formik.handleChange(e);
						setOrgDetails({ ...orgDetails, ogrn: e.target.value });
					}}
				/>

				<UIFormInput
					label='Юридический адрес'
					name='orgAddr'
					type='text'
					value={formik.values.orgAddr}
					isError={formik.errors.orgAddr && formik.touched.orgAddr ? true : false}
					errorMessage={formik.errors.orgAddr}
					onChange={(e) => {
						formik.handleChange(e);
						setOrgDetails({ ...orgDetails, orgAddr: e.target.value });
					}}
				/>
			</UIDisclosure>
		</FormLayout>
	);
};
