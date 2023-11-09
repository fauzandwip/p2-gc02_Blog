import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Detail from '../pages/Detail';

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
				path: '/pub/posts',
				element: <Home />,
			},
			{
				path: '/pub/posts/:id',
				element: <Detail />,
			},
			{
				path: 'login',
				element: <Login />,
			},
		],
	},
]);

export default router;