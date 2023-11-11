import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/index.jsx';
import './index.css';
import Toast from './components/Toast.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
		<Toast />
	</React.StrictMode>
);
