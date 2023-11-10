import PropTypes from 'prop-types';

const Select = ({
	id,
	labelName,
	title,
	options,
	value,
	onChange,
	isRequired = false,
}) => {
	const optionElements = options.map((data) => {
		return (
			<option key={data.id} value={data.id}>
				{data.name}
			</option>
		);
	});

	return (
		<label htmlFor={id} className="flex flex-col gap-2 w-full">
			<span
				className={
					isRequired ? "after:content-['*'] after:ml-1 after:text-red-500" : ''
				}
			>
				{labelName}
			</span>
			<select
				name=""
				id=""
				className="p-3 bg-teal-500 w-full rounded-md hover:cursor-pointer text-slate-800"
				onChange={onChange}
				value={value}
			>
				<option disabled value={'default'}>
					{title}
				</option>
				{optionElements}
			</select>
		</label>
	);
};

export default Select;

Select.propTypes = {
	id: PropTypes.string,
	labelName: PropTypes.string,
	title: PropTypes.string,
	options: PropTypes.array,
	value: PropTypes.string,
	onChange: PropTypes.func,
	isRequired: PropTypes.bool,
};
