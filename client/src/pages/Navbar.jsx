import ButtonNormal from '../components/ButtonNormal';
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<>
			<nav className="flex justify-between items-center fixed w-full bg-gray-800 py-2 px-24 shadow-md shadow-teal-500">
				<div>
					<img
						src="https://images.tokopedia.net/img/FZfiOH/2021/6/11/9cc90aa3-90d4-4560-bf75-c881573fc2d4.png"
						alt="Hacktiv8 Logo"
						className="w-14"
					/>
				</div>
				<Link to="/login">
					<ButtonNormal color={'teal'}>{'Sign In'}</ButtonNormal>
				</Link>
			</nav>
		</>
	);
}

export default Navbar;
