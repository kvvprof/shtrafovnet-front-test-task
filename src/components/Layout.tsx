import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

export const Layout = ({ children }: PropsWithChildren) => {
	return (
		<div className='flex h-full w-full flex-col gap-4 p-4'>
			{children}
			<ToastContainer
				position='bottom-right'
				autoClose={1000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</div>
	);
};
