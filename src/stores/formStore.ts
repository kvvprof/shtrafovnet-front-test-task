import { AccountsType, CustomerDetailsType, EmailsType, MetasType, OrgDetailsType } from '@/types/formType';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
	isSubmitted: boolean;
	customerDetails: CustomerDetailsType;
	orgDetails: OrgDetailsType;
	accounts: AccountsType[];
	emails: EmailsType[];
	metas: MetasType[];
};

type Actions = {
	setIsSubmitted: (payload: boolean) => void;
	setCustomerDetails: (payload: CustomerDetailsType) => void;
	setOrgDetails: (payload: OrgDetailsType) => void;
	setAccount: () => void;
	updateAccount: (payload: AccountsType) => void;
	deleteAccount: (payload: AccountsType) => void;
	setDefaultAccount: (payload: AccountsType) => void;
	setEmail: () => void;
	updateEmail: (payload: EmailsType) => void;
	deleteEmail: (payload: EmailsType) => void;
	setMeta: () => void;
	updateMeta: (payload: MetasType) => void;
	deleteMeta: (payload: MetasType) => void;
	resetFormStore: () => void;
};

const initialState: State = {
	isSubmitted: false,
	customerDetails: { customerName: '', customerEmail: '', creditLimit: 0, deferralDays: 0, isValid: false },
	orgDetails: {
		orgName: '',
		inn: '',
		kpp: '',
		ogrn: '',
		orgAddr: '',
		isValid: false
	},
	accounts: [
		{
			id: 1,
			accountName: '',
			accountNumber: '',
			bik: '',
			corrAccountNumber: '',
			isDefault: true,
			isValid: false
		}
	],
	emails: [{ id: 1, email: '', isValid: false }],
	metas: []
};

export const useFormStore = create<State & Actions>()(
	immer((set) => ({
		...initialState,

		setIsSubmitted: (payload) =>
			set((state) => {
				state.isSubmitted = payload;
			}),

		setCustomerDetails: (payload) =>
			set((state) => {
				state.customerDetails = payload;
			}),

		setOrgDetails: (payload) =>
			set((state) => {
				state.orgDetails = payload;
			}),

		setAccount: () =>
			set((state) => {
				state.accounts.push({
					id: state.accounts.length + 1,
					accountName: '',
					accountNumber: '',
					bik: '',
					corrAccountNumber: '',
					isDefault: false,
					isValid: false
				});
			}),

		updateAccount: (payload) =>
			set((state) => {
				state.accounts = state.accounts.map((account) => (account.id === payload.id ? { ...payload } : { ...account }));
			}),

		deleteAccount: (payload) =>
			set((state) => {
				state.accounts = state.accounts.filter((account) => account.id !== payload.id);

				if (payload.isDefault) {
					state.accounts[0] = { ...state.accounts[0], isDefault: true };
				}
			}),

		setDefaultAccount: (payload) =>
			set((state) => {
				state.accounts = state.accounts.map((account) =>
					account.id === payload.id ? { ...account, isDefault: true } : { ...account, isDefault: false }
				);
			}),

		setEmail: () =>
			set((state) => {
				state.emails.push({ id: state.emails.length + 1, email: '', isValid: false });
			}),

		updateEmail: (payload) =>
			set((state) => {
				state.emails = state.emails.map((email) => (email.id === payload.id ? { ...payload } : { ...email }));
			}),

		deleteEmail: (payload) =>
			set((state) => {
				state.emails = state.emails.filter((email) => email.id !== payload.id);
			}),

		setMeta: () =>
			set((state) => {
				state.metas.push({ id: state.metas.length + 1, metaKey: '', metaValue: '', isValid: false });
			}),

		updateMeta: (payload) =>
			set((state) => {
				state.metas = state.metas.map((meta) => (meta.id === payload.id ? { ...payload } : { ...meta }));
			}),

		deleteMeta: (payload) =>
			set((state) => {
				state.metas = state.metas.filter((meta) => meta.id !== payload.id);
			}),

		resetFormStore: () => {
			set(initialState);
		}
	}))
);
