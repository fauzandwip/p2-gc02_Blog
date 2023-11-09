import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar';

const RootLayout = () => {
	return (
		<div>
			<Navbar></Navbar>
			<Outlet />
		</div>
	);
};

export default RootLayout;
