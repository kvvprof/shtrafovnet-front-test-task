import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

type UIDisclosurePropsType = {
	children: ReactNode;
	defaultOpen?: boolean;
	title?: string;
};

export const UIDisclosure = (props: UIDisclosurePropsType) => {
	const { children, defaultOpen = true, title } = props;

	return (
		<Disclosure defaultOpen={defaultOpen}>
			{({ open }) => (
				<>
					<Disclosure.Button className='mt-1 flex items-center gap-1 py-2'>
						<ChevronRightIcon width={15} height={15} className={open ? 'rotate-90 transform' : ''} />
						<span className='text-lg font-medium'>{title}</span>
					</Disclosure.Button>
					<Disclosure.Panel className='flex flex-col gap-3' unmount={false}>
						{children}
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};
