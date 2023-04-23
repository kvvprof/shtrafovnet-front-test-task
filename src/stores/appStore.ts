import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
	isModalOpen: boolean;
	searchValue: string;
};

type Actions = {
	setIsModalOpen: (payload: boolean) => void;
	setSearchValue: (payload: string) => void;
};

const initialState: State = {
	isModalOpen: false,
	searchValue: ''
};

export const useAppStore = create<State & Actions>()(
	immer((set) => ({
		...initialState,

		setIsModalOpen: (payload) =>
			set((state) => {
				state.isModalOpen = payload;
			}),

		setSearchValue: (payload) =>
			set((state) => {
				state.searchValue = payload;
			})
	}))
);
