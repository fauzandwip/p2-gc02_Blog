import PropTypes from 'prop-types';

const Input = ({
	type = 'text',
	labelName,
	id,
	name,
	value,
	onChange,
	placeholder,
	isRequired = false,
	addClassName,
}) => {
	return (
		<label htmlFor={id} className={`flex flex-col gap-2 ${addClassName}`}>
			<span
				className={
					isRequired ? "after:content-['*'] after:ml-1 after:text-red-500" : ''
				}
			>
				{labelName}
			</span>
			<input
				type={type}
				name={name}
				id={id}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className="bg-slate-600 text-slate-50 rounded-md p-2"
			/>
		</label>
	);
};

export default Input;

Input.propTypes = {
	type: PropTypes.string,
	labelName: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	text: PropTypes.string,
	placeholder: PropTypes.string,
	isRequired: PropTypes.bool,
	addClassName: PropTypes.string,
};
