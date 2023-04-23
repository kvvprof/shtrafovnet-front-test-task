import { useDebounce } from '@/hooks/useDebounce';
import { useAppStore } from '@/stores/appStore';
import { useEffect, useState } from 'react';

export const Search = () => {
	const [search, setSearch] = useState<string>('');
	const setSearchValue = useAppStore((state) => state.setSearchValue);
	const debouncedValue = useDebounce(search, 300);

	useEffect(() => {
		setSearchValue(search);
	}, [debouncedValue]);

	return (
		<input
			className='border-grey w-[300px] rounded-md border-2 p-2'
			type='text'
			placeholder='Поиск по email'
			onChange={(e) => {
				setSearch(e.target.value.trim());
			}}
		/>
	);
};
