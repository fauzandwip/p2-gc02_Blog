import PropTypes from 'prop-types';

const InputText = ({ labelName, id, name, value, onChange, placeholder }) => {
	return (
		<div className="flex flex-col gap-1">
			<label htmlFor="search">{labelName}</label>
			<input
				type="text"
				name={name}
				id={id}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className="bg-slate-600 py-1 px-2 rounded-md"
			/>
		</div>
	);
};

export default InputText;

InputText.propTypes = {
	labelName: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	text: PropTypes.string,
	placeholder: PropTypes.string,
};
