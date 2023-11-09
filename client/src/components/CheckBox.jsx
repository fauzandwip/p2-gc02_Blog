import PropTypes from 'prop-types';

const CheckBox = ({ id, onChange, text }) => {
	return (
		<label
			htmlFor={'category' + id}
			className="flex gap-3 items-center"
			onChange={onChange}
		>
			<input type="checkbox" name="sport" value={id + 1} id={'category' + id} />
			{text}
		</label>
	);
};

export default CheckBox;

CheckBox.propTypes = {
	id: PropTypes.number,
	onChange: PropTypes.func,
	text: PropTypes.string,
};
