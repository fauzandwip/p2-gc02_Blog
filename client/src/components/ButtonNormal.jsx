import PropTypes from 'prop-types';

const ButtonNormal = ({ type, color, onClick, addClassName, children }) => {
	const colorVariants = {
		red: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white',
		teal: 'bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white',
		'teal-light':
			'bg-teal-300 text-slate-800 font-bold hover:bg-teal-400 active:bg-teal-500',
	};

	const className = `py-2 px-4 h-10 rounded-lg hover:cursor-pointer ${addClassName} ${colorVariants[color]}`;

	if (type === 'submit') {
		return <input type="submit" value={children} className={className} />;
	}

	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
};

export default ButtonNormal;

ButtonNormal.propTypes = {
	type: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	addClassName: PropTypes.string,
	children: PropTypes.any,
};
