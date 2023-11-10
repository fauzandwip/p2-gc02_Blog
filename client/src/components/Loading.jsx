import PropTypes from 'prop-types';

const Loading = ({ bgColor, color, children = 'Loading...' }) => {
	return (
		<div
			className={`w-full h-screen flex justify-center items-center text-4xl font-bold ${bgColor} ${color}`}
		>
			{children}
		</div>
	);
};

export default Loading;

Loading.propTypes = {
	bgColor: PropTypes.string,
	color: PropTypes.string,
	children: PropTypes.any,
};
