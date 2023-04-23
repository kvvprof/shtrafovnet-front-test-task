type UISecondaryBtnPropsType = {
	name?: string;
	disabled?: boolean;
	isLoading?: boolean;
	width?: number | string;
	className?: string;
	onClick?: () => void;
};

export const UISecondaryBtn = (props: UISecondaryBtnPropsType) => {
	const { name, disabled = false, isLoading = false, width = 90, className, onClick } = props;

	return (
		<button
			className={`w-full rounded-md border-2 border-dashed border-gray-300 p-2 text-gray-400 hover:border-gray-400 ${className}`}
			type='button'
			style={{ width: width }}
			disabled={disabled}
			onClick={onClick}>
			{!isLoading ? name : 'Загрузка...'}
		</button>
	);
};
