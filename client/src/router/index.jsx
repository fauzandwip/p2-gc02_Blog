import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Detail from '../pages/Detail';
import CMSPosts from '../pages/CMSPosts';
import Category from '../pages/Category';
import AddUser from '../pages/AddUser';

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
				path: 'pub/posts',
				element: <Home />,
			},
			{
				path: 'pub/posts/:id',
				element: <Detail />,
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'add-user',
				element: <AddUser />,
			},
			{
				path: 'posts',
				element: <CMSPosts />,
			},
			{
				path: 'categories',
				element: <Category />,
			},
		],
	},
]);

export default router;
