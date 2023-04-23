import { UIPrimaryBtn } from '../UI/UIButtons/UIPrimaryBtn';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { BankAccount, CreatedCustomerType, CustomerType, Metadata } from '@/types/customerType';
import { useAppStore } from '@/stores/appStore';
import { useFormStore } from '@/stores/formStore';
import { toast } from 'react-toastify';
import { AccountsType, EmailsType, MetasType } from '@/types/formType';

export const Submit = () => {
	const { accounts, customerDetails, emails, metas, orgDetails, isSubmitted, setIsSubmitted, resetFormStore } =
		useFormStore();

	const setIsModalOpen = useAppStore((state) => state.setIsModalOpen);

	const createCustomer = useMutation({
		mutationFn: async (): Promise<CreatedCustomerType> => {
			const createBankAccounts = (): BankAccount[] => {
				const bankAccounts: BankAccount[] = [];
				accounts.forEach((account) =>
					bankAccounts.push({
						name: account.accountName,
						bik: account.bik,
						account_number: account.accountNumber,
						corr_account_number: account.corrAccountNumber,
						is_default: account.isDefault
					})
				);
				return bankAccounts;
			};

			const createInvoiceEmails = (): string[] => {
				const invoiceEmails: string[] = [];
				emails.forEach((email) => invoiceEmails.push(email.email));
				return invoiceEmails;
			};

			const createMetadata = (): Metadata[] => {
				const metadata: Metadata[] = [];
				metas.forEach((meta) => metadata.push({ key: meta.metaKey, value: meta.metaValue }));
				return metadata;
			};

			const newCustomer: CustomerType = {
				name: customerDetails.customerName,
				email: customerDetails.customerEmail,
				deferral_days: customerDetails.deferralDays,
				credit_limit: customerDetails.creditLimit,
				organization: {
					name: orgDetails.orgName,
					inn: orgDetails.inn,
					kpp: orgDetails.kpp,
					ogrn: orgDetails.ogrn,
					addr: orgDetails.orgAddr,
					bank_accounts: createBankAccounts()
				},
				invoice_emails: createInvoiceEmails(),
				metadata: createMetadata(),
				created_at: Date.now().toString(),
				updated_at: Date.now().toString()
			};

			const { data } = await axios.post<CreatedCustomerType>('http://localhost:5555/customers', newCustomer);
			return data;
		},
		onSuccess() {
			setIsModalOpen(false);
			resetFormStore();
		},
		onError() {
			toast('Не удалось создать клиента');
		}
	});

	const checkIsValid = (arr: Array<AccountsType | EmailsType | MetasType>): boolean => {
		let isValid: boolean = true;

		arr.forEach((el) => {
			if (!el.isValid) {
				isValid = false;
				return;
			}
		});

		return isValid;
	};

	useEffect(() => {
		if (
			!createCustomer.isLoading &&
			isSubmitted &&
			customerDetails.isValid &&
			orgDetails.isValid &&
			checkIsValid(accounts) &&
			checkIsValid(emails) &&
			checkIsValid(metas)
		) {
			createCustomer.mutate();
		}
	}, [isSubmitted, customerDetails, orgDetails, accounts, emails, metas]);

	return (
		<UIPrimaryBtn
			type='submit'
			className='mt-4'
			name='Создать'
			width={'100%'}
			onClick={() => setIsSubmitted(true)}
			disabled={createCustomer.isLoading}
		/>
	);
};
