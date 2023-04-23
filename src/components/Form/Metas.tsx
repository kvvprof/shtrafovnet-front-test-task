import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { UIDisclosure } from '../UI/UIDisclosure';
import { UISecondaryBtn } from '../UI/UIButtons/UISecondaryBtn';
import { FormLayout } from './FormLayout';
import { UIFormInput } from '../UI/UIFormInput';
import { UIDeleteBtn } from '../UI/UIButtons/UIDeleteBtn';
import { useFormStore } from '@/stores/formStore';
import { MetasType } from '@/types/formType';

const Meta = (props: MetasType) => {
	const { id, metaKey, metaValue, isValid } = props;

	const isSubmitted = useFormStore((state) => state.isSubmitted);
	const setIsSubmitted = useFormStore((state) => state.setIsSubmitted);

	const updateMeta = useFormStore((state) => state.updateMeta);
	const deleteMeta = useFormStore((state) => state.deleteMeta);

	const formik = useFormik<MetasType>({
		initialValues: {
			id: id,
			metaKey: metaKey,
			metaValue: metaValue,
			isValid: isValid
		},
		validationSchema: Yup.object().shape({
			metaKey: Yup.string().required('Введите ключ'),
			metaValue: Yup.string().required('Введите значение')
		}),
		onSubmit: (values) => {
			updateMeta({ ...values, isValid: true });
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
		<FormLayout className='border-grey border-b-[1px]'>
			<div className='grid grid-cols-[1fr_1fr_50px]'>
				<UIFormInput
					className='m-2'
					name='metaKey'
					type='text'
					value={formik.values.metaKey}
					isError={formik.errors.metaKey && formik.touched.metaKey ? true : false}
					onChange={(e) => {
						formik.handleChange(e);
						updateMeta({ ...props, metaKey: e.target.value });
					}}
				/>

				<UIFormInput
					className='m-2'
					name='metaValue'
					type='text'
					value={formik.values.metaValue}
					isError={formik.errors.metaValue && formik.touched.metaValue ? true : false}
					onChange={(e) => {
						formik.handleChange(e);
						updateMeta({ ...props, metaValue: e.target.value });
					}}
				/>

				<div className='flex items-center justify-center'>
					<UIDeleteBtn onClick={() => deleteMeta(props)} />
				</div>
			</div>
		</FormLayout>
	);
};

export const Metas = () => {
	const metas = useFormStore((state) => state.metas);
	const setMeta = useFormStore((state) => state.setMeta);

	return (
		<UIDisclosure title='Meta'>
			<div className='border-grey border-l-[1px] border-r-[1px] border-t-[1px]'>
				<div className='grid grid-cols-[1fr_1fr_50px] bg-gray-100'>
					<div className='m-2'>Ключ</div>
					<div className='m-2'>Значение</div>
					<div></div>
				</div>
				<div>
					{metas.map((meta) => (
						<Meta key={meta.id} {...meta} />
					))}
				</div>
			</div>

			<UISecondaryBtn width={'100%'} name='Добавить ключ и значение' onClick={setMeta} />
		</UIDisclosure>
	);
};
