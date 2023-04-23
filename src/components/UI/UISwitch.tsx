import { Switch } from '@headlessui/react';

type UISwitchPropsType = {
	checked: boolean;
	disabled: boolean;
	onChange: () => void;
};

export const UISwitch = (props: UISwitchPropsType) => {
	const { checked, disabled, onChange } = props;

	return (
		<Switch
			checked={checked}
			disabled={disabled}
			onChange={onChange}
			className={`${
				checked ? 'bg-blue-600 opacity-50' : 'bg-gray-200'
			} relative inline-flex h-6 w-11 items-center rounded-full ${disabled && 'cursor-not-allowed'}`}>
			<span
				className={`${
					checked ? 'translate-x-6' : 'translate-x-1'
				} inline-block h-4 w-4 transform rounded-full bg-white transition`}
			/>
		</Switch>
	);
};
