export type CustomerType = {
	name: string;
	email: string;
	deferral_days: number;
	credit_limit: number;
	organization: Organization;
	invoice_emails: string[];
	metadata: Metadata[];
	created_at: string;
	updated_at: string;
};

export type Organization = {
	name: string;
	inn: string;
	kpp: string;
	ogrn: string;
	addr: string;
	bank_accounts: BankAccount[];
};

export type BankAccount = {
	name: string;
	bik: string;
	account_number: string;
	corr_account_number: string;
	is_default: boolean;
};

export type Metadata = {
	key: string;
	value: string;
};

export type CreatedCustomerType = CustomerType & {
	id: number;
};
