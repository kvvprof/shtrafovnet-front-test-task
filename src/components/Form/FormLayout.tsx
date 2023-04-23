import { ReactNode, useRef } from 'react';

type FormLayoutPropsType = {
	children: ReactNode;
	className?: string;
};

export const FormLayout = (props: FormLayoutPropsType) => {
	const { className, children } = props;
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<form className={`relative flex flex-col gap-3 ${className}`} ref={formRef} onSubmit={(e) => e.preventDefault()}>
			{children}
		</form>
	);
};
