import PropTypes from 'prop-types';

const Navigation = ({ addClassName, currentPage, children }) => {
	const activeNav = 'text-teal-400 shadow-sm bg-teal-400/10 shadow-teal-400';
	return (
		<li
			className={`p-4 flex items-center text-slate-100 text-lg hover:cursor-pointer hover:text-teal-400 hover:shadow-sm hover:bg-teal-400/10 hover:shadow-teal-400 ${addClassName} ${
				currentPage === children ? activeNav : ''
			}`}
		>
			{children}
		</li>
	);
};

export default Navigation;

Navigation.propTypes = {
	addClassName: PropTypes.string,
	currentPage: PropTypes.string,
	children: PropTypes.any,
};
