import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import { useState } from 'react';

const RootLayout = () => {
	const [token, setToken] = useState(localStorage.getItem('access_token'));

	const cmsNavigation = [
		{
			name: 'Posts',
			path: '/posts',
		},
		{
			name: 'Categories',
			path: '/categories',
		},
		{
			name: 'Add User',
			path: '/add-user',
		},
		{
			name: 'Pub Posts',
			path: '/pub/posts',
		},
	];

	const pubNavigation = [
		{
			name: 'Posts',
			path: '/pub/posts',
		},
	];

	return (
		<div>
			<Navbar
				navigations={token ? cmsNavigation : pubNavigation}
				token={token}
				setToken={setToken}
			></Navbar>
			<Outlet context={[token, setToken]} />
		</div>
	);
};

export default RootLayout;
