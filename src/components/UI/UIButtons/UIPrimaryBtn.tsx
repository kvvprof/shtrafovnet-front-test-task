type UIPrimaryBtnPropsType = {
	name?: string;
	disabled?: boolean;
	isLoading?: boolean;
	width?: number | string;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
};

export const UIPrimaryBtn = (props: UIPrimaryBtnPropsType) => {
	const { name, disabled = false, isLoading = false, width = 90, className, type = 'button', onClick } = props;

	return (
		<button
			type={type}
			className={`rounded-md bg-blue-500 p-3 text-white hover:opacity-90 ${disabled && 'opacity-80'} ${className}`}
			style={{ width: width }}
			disabled={disabled}
			onClick={onClick}>
			{!isLoading ? name : 'Загрузка...'}
		</button>
	);
};
