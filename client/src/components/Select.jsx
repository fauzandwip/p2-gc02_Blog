import PropTypes from 'prop-types';

const Select = ({ title, options, onChange }) => {
	const optionElements = [];
	for (const key in options) {
		optionElements.push(
			<option key={key + 1} value={options[key]}>
				{key}
			</option>
		);
	}

	return (
		<select
			name=""
			id=""
			className="p-3 bg-teal-500 w-full rounded-md"
			onChange={onChange}
		>
			<option disabled key={title}>
				{title}
			</option>
			{optionElements}
		</select>
	);
};

export default Select;

Select.propTypes = {
	title: PropTypes.string,
	options: PropTypes.object,
	onChange: PropTypes.func,
};
