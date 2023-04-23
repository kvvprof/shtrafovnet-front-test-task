import { parseTimestamp } from '@/utils/parseTimestamp';
import axios from 'axios';
import { useMutation } from 'react-query';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { CreatedCustomerType } from '@/types/customerType';
import { UIPrimaryBtn } from './UI/UIButtons/UIPrimaryBtn';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppStore } from '@/stores/appStore';

const Row = (props: CreatedCustomerType) => {
	const { name, id, email, deferral_days, created_at, updated_at, credit_limit } = props;

	return (
		<>
			<tr>
				<td>{name}</td>
				<td className='flex items-center gap-1'>
					<ClipboardDocumentIcon
						className='cursor-pointer hover:text-blue-500'
						width={17}
						height={17}
						onClick={() => {
							navigator.clipboard.writeText(id.toString());
							toast('ID скопирован');
						}}
					/>
					{id}
				</td>
				<td>{email}</td>
				<td>{deferral_days} дней</td>
				<td>{credit_limit}</td>
				<td>{parseTimestamp(created_at)}</td>
				<td>{parseTimestamp(updated_at)}</td>
				<td>
					<UIPrimaryBtn
						className='p-[5px] text-xs'
						name='json'
						width={40}
						onClick={() => window.open(`http://localhost:5555/customers/${id}`, '_blank')}
					/>
				</td>
			</tr>
		</>
	);
};

export const Table = () => {
	const isModalOpen = useAppStore((state) => state.isModalOpen);
	const searchValue = useAppStore((state) => state.searchValue);

	const getCustomers = useMutation({
		mutationFn: async (): Promise<CreatedCustomerType[]> => {
			const link =
				searchValue === '' ? `http://localhost:5555/customers` : `http://localhost:5555/customers?email=${searchValue}`;

			const { data } = await axios.get<CreatedCustomerType[]>(link);
			return data;
		}
	});

	useEffect(() => {
		!isModalOpen && getCustomers.mutate();
	}, [isModalOpen, searchValue]);

	return (
		<table>
			<tbody>
				<tr className='bg-gray-100 p-2 text-lg font-medium'>
					<td>Имя</td>
					<td>ID</td>
					<td>Email</td>
					<td>Отсрочка оплаты</td>
					<td>Лимит</td>
					<td>Создан</td>
					<td>Изменен</td>
					<td></td>
				</tr>
				{getCustomers.data?.map((customer) => (
					<Row key={customer.id} {...customer} />
				))}
			</tbody>
		</table>
	);
};
