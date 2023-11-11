import ButtonNormal from '../components/ButtonNormal';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ token, setToken }) => {
	const navigate = useNavigate();
	const [currentNav, setCurrentNav] = useState('Posts');

	let navigationData = [
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
	];

	const navigation = [];
	// console.log(token, 'navbar');
	if (token) {
		// console.log(token, 'navbar');
		navigationData.forEach(({ name, path }, idx) => {
			navigation.push(
				<Link key={idx} to={path} onClick={() => setCurrentNav(name)}>
					<Navigation currentPage={currentNav}>{name}</Navigation>
				</Link>
			);
		});
	}

	const onLogout = async () => {
		localStorage.removeItem('access_token');
		setToken('');
		navigate('/login');
	};

	return (
		<>
			<nav className="flex justify-between items-center fixed w-full bg-gray-800 px-24 shadow-md shadow-teal-500">
				<div className="flex flex-row gap-10">
					<img
						src="https://images.tokopedia.net/img/FZfiOH/2021/6/11/9cc90aa3-90d4-4560-bf75-c881573fc2d4.png"
						alt="Hacktiv8 Logo"
						className="w-14"
					/>
					<ul className="flex flex-row items-center">{navigation}</ul>
				</div>
				{token ? (
					<ButtonNormal color={'red'} onClick={onLogout}>
						{'Logout'}
					</ButtonNormal>
				) : (
					<Link to="/login">
						<ButtonNormal color={'teal'}>{'Sign In'}</ButtonNormal>
					</Link>
				)}
			</nav>
		</>
	);
};

export default Navbar;

Navbar.propTypes = {
	token: PropTypes.string,
	setToken: PropTypes.func,
};
