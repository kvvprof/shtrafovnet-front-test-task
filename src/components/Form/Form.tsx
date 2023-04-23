import { Accounts } from './Accounts';
import { OrgDetails } from './OrgDetails';
import { Emails } from './Emails';
import { Metas } from './Metas';
import { CustomerDetails } from './CustomerDetails';
import { Submit } from './Submit';

export const Form = () => {
	return (
		<>
			<div className='flex flex-col gap-2'>
				<CustomerDetails />
				<OrgDetails />
				<Accounts />
				<Emails />
				<Metas />
			</div>
			<Submit />
		</>
	);
};
