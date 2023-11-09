import PropTypes from 'prop-types';

const Form = ({ children, onSubmit }) => {
	return (
		<form
			className="flex flex-col bg-slate-800 text-slate-300 w-1/3 px-8 py-10 rounded-md gap-6"
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
};