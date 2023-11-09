import PropTypes from 'prop-types';

const Error = ({ error }) => {
	return (
		<div className="w-full h-screen flex justify-center items-center text-4xl font-bold">
			<p>Error fetching, please try again later, {error}</p>
		</div>
	);
};

export default Error;

Error.propTypes = {
	error: PropTypes.string,
};
