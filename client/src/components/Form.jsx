import PropTypes from 'prop-types';

const Form = ({ children, onSubmit, className }) => {
	return (
		<form
			className={`flex flex-col bg-slate-800 text-slate-300 p-8 rounded-md gap-6 ${className}`}
			onSubmit={onSubmit}
		>
			{children}
		</form>
	);
};

export default Form;

Form.propTypes = {
	children: PropTypes.any,
	onSubmit: PropTypes.func,
	className: PropTypes.string,
};
