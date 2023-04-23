import { UIModal } from '../UI/UIModal';
import { UIPrimaryBtn } from '../UI/UIButtons/UIPrimaryBtn';
import { Form } from '../Form/Form';
import { useFormStore } from '@/stores/formStore';
import { Search } from './Search';
import { useAppStore } from '@/stores/appStore';

export const Header = () => {
	const isModalOpen = useAppStore((state) => state.isModalOpen);
	const setIsModalOpen = useAppStore((state) => state.setIsModalOpen);
	const resetFormStore = useFormStore((state) => state.resetFormStore);

	return (
		<>
			<header className='flex w-full items-center justify-between'>
				<h1 className='text-3xl font-bold'>Клиенты</h1>
				<div className='flex gap-2'>
					<Search />
					<UIPrimaryBtn name='+ Добавить клиента' width={180} onClick={() => setIsModalOpen(true)} />
				</div>
			</header>
			<UIModal
				title='Добавление клиента'
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					resetFormStore();
				}}>
				<Form />
			</UIModal>
		</>
	);
};
