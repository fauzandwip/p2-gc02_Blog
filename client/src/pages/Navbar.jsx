import ButtonNormal from '../components/ButtonNormal';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PropTypes from 'prop-types';

const Navbar = ({ token, setToken, navigations }) => {
	const navigate = useNavigate();

	const onLogout = async () => {
		localStorage.removeItem('access_token');
		setToken('');
		navigate('/login');
	};

	return (
		<>
			<nav className="flex justify-between items-center fixed w-full bg-gray-800 px-24 shadow-md shadow-teal-500 z-20">
				<div className="flex flex-row gap-10">
					<img
						src="https://images.tokopedia.net/img/FZfiOH/2021/6/11/9cc90aa3-90d4-4560-bf75-c881573fc2d4.png"
						alt="Hacktiv8 Logo"
						className="w-14"
					/>
					<ul className="flex flex-row items-center">
						{navigations.map(({ name, path }, idx) => {
							return (
								<Link key={idx} to={path}>
									<Navigation path={path}>{name}</Navigation>
								</Link>
							);
						})}
					</ul>
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
	navigations: PropTypes.array,
};
