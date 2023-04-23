export type AccountsType = {
	id: number;
	accountName: string;
	accountNumber: string;
	bik: string;
	corrAccountNumber: string;
	isDefault: boolean;
	isValid: boolean;
};

export type OrgDetailsType = {
	orgName: string;
	inn: string;
	kpp: string;
	ogrn: string;
	orgAddr: string;
	isValid: boolean;
};

export type CustomerDetailsType = {
	customerName: string;
	customerEmail: string;
	deferralDays: number;
	creditLimit: number;
	isValid: boolean;
};

export type EmailsType = {
	id: number;
	email: string;
	isValid: boolean;
};

export type MetasType = {
	id: number;
	metaKey: string;
	metaValue: string;
	isValid: boolean;
};
