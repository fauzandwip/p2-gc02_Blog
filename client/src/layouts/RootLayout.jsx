import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import { useState } from 'react';

const RootLayout = () => {
	const [token, setToken] = useState(localStorage.getItem('access_token'));

	return (
		<div>
			<Navbar token={token} setToken={setToken}></Navbar>
			<Outlet context={[token, setToken]} />
		</div>
	);
};

export default RootLayout;
