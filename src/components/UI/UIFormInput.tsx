import { ChangeEvent } from 'react';

type UIFormInputPropsType = {
	label?: string;
	name?: string;
	placeholder?: string;
	type:
		| 'text'
		| 'password'
		| 'checkbox'
		| 'radio'
		| 'file'
		| 'submit'
		| 'reset'
		| 'hidden'
		| 'date'
		| 'time'
		| 'search'
		| 'color'
		| 'email'
		| 'number'
		| 'range';
	value: string | number;
	className?: string;
	isError?: boolean;
	errorMessage?: string | undefined;
	isDisabled?: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UIFormInput = (props: UIFormInputPropsType) => {
	const {
		label,
		className,
		isError,
		name,
		type,
		value,
		errorMessage,
		placeholder,
		isDisabled = false,
		onChange
	} = props;

	return (
		<label className='flex flex-col gap-1 text-black'>
			{label}
			<input
				className={`rounded-md bg-gray-100 p-3 ${isError && 'bg-red-100'} ${
					isDisabled && 'cursor-not-allowed'
				} ${className}`}
				name={name}
				type={type}
				value={value}
				placeholder={placeholder}
				disabled={isDisabled}
				onChange={(e) => onChange(e)}
			/>
			{isError && <p className='text-sm text-red-500'>{errorMessage ? errorMessage : ''}</p>}
		</label>
	);
};
