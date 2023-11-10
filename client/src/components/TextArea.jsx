import PropTypes from 'prop-types';

const TextArea = ({
	labelName,
	value,
	id,
	name,
	cols,
	rows,
	onChange,
	placeholder,
	isRequired = false,
}) => {
	return (
		<>
			<label htmlFor="content-post-form" className="flex flex-col gap-2">
				<span
					className={
						isRequired
							? "after:content-['*'] after:ml-1 after:text-red-500"
							: ''
					}
				>
					{labelName}
				</span>
				<textarea
					name={name}
					id={id}
					cols={cols}
					rows={rows}
					placeholder={placeholder}
					className="bg-slate-600 rounded-md p-2"
					onChange={onChange}
					value={value}
				></textarea>
			</label>
		</>
	);
};

export default TextArea;

TextArea.propTypes = {
	labelName: PropTypes.string,
	value: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	cols: PropTypes.number,
	rows: PropTypes.number,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	isRequired: PropTypes.bool,
};
