import { TrashIcon } from '@heroicons/react/24/outline';

type UIDeleteBtnPropsType = {
	onClick?: () => void;
	className?: string;
};

export const UIDeleteBtn = (props: UIDeleteBtnPropsType) => {
	const { className, onClick } = props;

	return (
		<button type='button' className={`rounded-md bg-gray-100 p-2 hover:bg-gray-200 ${className}`} onClick={onClick}>
			<TrashIcon className='cursor-pointer text-red-300' width={15} height={15} />
		</button>
	);
};
