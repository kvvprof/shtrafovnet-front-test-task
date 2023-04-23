import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { UIDisclosure } from '../UI/UIDisclosure';
import { UISwitch } from '../UI/UISwitch';
import { UISecondaryBtn } from '../UI/UIButtons/UISecondaryBtn';
import { FormLayout } from './FormLayout';
import { UIFormInput } from '../UI/UIFormInput';
import { UIDeleteBtn } from '../UI/UIButtons/UIDeleteBtn';
import { useFormStore } from '@/stores/formStore';
import { AccountsType } from '@/types/formType';

const Account = (props: AccountsType) => {
	const { id, accountName, accountNumber, bik, corrAccountNumber, isDefault, isValid } = props;

	const isSubmitted = useFormStore((state) => state.isSubmitted);
	const setIsSubmitted = useFormStore((state) => state.setIsSubmitted);

	const updateAccount = useFormStore((state) => state.updateAccount);
	const deleteAccount = useFormStore((state) => state.deleteAccount);
	const setDefaultAccount = useFormStore((state) => state.setDefaultAccount);

	const formik = useFormik<AccountsType>({
		initialValues: {
			id: id,
			accountName: accountName,
			accountNumber: accountNumber,
			bik: bik,
			corrAccountNumber: corrAccountNumber,
			isDefault: isDefault,
			isValid: isValid
		},
		validationSchema: Yup.object().shape({
			accountName: Yup.string().required('Введите название счета'),
			accountNumber: Yup.string().required('Введите номер счета'),
			bik: Yup.string().required('Введите БИК счета'),
			corrAccountNumber: Yup.string().required('Введите корр. номер счета')
		}),
		onSubmit: (values) => {
			updateAccount({ ...values, isValid: true });
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

	useEffect(() => {
		formik.setFieldValue('isDefault', isDefault);
	}, [isDefault]);

	return (
		<FormLayout>
			{id !== 1 && <UIDeleteBtn className='absolute right-0 top-[-10px]' onClick={() => deleteAccount(props)} />}
			<UIFormInput
				label='Название счета'
				name='accountName'
				type='text'
				value={formik.values.accountName}
				isError={formik.errors.accountName && formik.touched.accountName ? true : false}
				errorMessage={formik.errors.accountName}
				onChange={(e) => {
					formik.handleChange(e);
					updateAccount({ ...props, accountName: e.target.value });
				}}
			/>

			<UIFormInput
				label='Номер счета'
				name='accountNumber'
				type='text'
				value={formik.values.accountNumber}
				isError={formik.errors.accountNumber && formik.touched.accountNumber ? true : false}
				errorMessage={formik.errors.accountNumber}
				onChange={(e) => {
					formik.handleChange(e);
					updateAccount({ ...props, accountNumber: e.target.value });
				}}
			/>
			<UIFormInput
				label='БИК счета'
				name='bik'
				type='text'
				value={formik.values.bik}
				isError={formik.errors.bik && formik.touched.bik ? true : false}
				errorMessage={formik.errors.bik}
				onChange={(e) => {
					formik.handleChange(e);
					updateAccount({ ...props, bik: e.target.value });
				}}
			/>

			<UIFormInput
				label='Корр. номер счета'
				name='corrAccountNumber'
				type='text'
				value={formik.values.corrAccountNumber}
				isError={formik.errors.corrAccountNumber && formik.touched.corrAccountNumber ? true : false}
				errorMessage={formik.errors.corrAccountNumber}
				onChange={(e) => {
					formik.handleChange(e);
					updateAccount({ ...props, corrAccountNumber: e.target.value });
				}}
			/>

			<label className='flex flex-col gap-1'>
				Дефолтный счет
				<UISwitch checked={isDefault} disabled={isDefault} onChange={() => setDefaultAccount(props)} />
			</label>
		</FormLayout>
	);
};

export const Accounts = () => {
	const accounts = useFormStore((state) => state.accounts);
	const setAccount = useFormStore((state) => state.setAccount);

	return (
		<UIDisclosure title='Банковские счета'>
			<div className='flex flex-col gap-10'>
				{accounts.map((account) => (
					<Account key={account.id} {...account} />
				))}
			</div>
			<UISecondaryBtn width={'100%'} name='Добавить счет' onClick={setAccount} />
		</UIDisclosure>
	);
};
