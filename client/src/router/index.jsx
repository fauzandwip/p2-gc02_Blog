import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: '/pub',
				children: [
					{
						path: 'posts',
						element: <Home />,
					},
				],
			},
			{
				path: 'login',
				element: <Login />,
			},
		],
	},
]);

export default router;
