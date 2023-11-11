import PropTypes from 'prop-types';

const Error = ({ children }) => {
	return (
		<div className="w-full h-screen flex flex-col justify-center items-center gap-10 text-4xl font-bold">
			<p>Error fetching, please try again later</p>
			<p>{children}</p>
		</div>
	);
};

export default Error;

Error.propTypes = {
	children: PropTypes.any,
};
