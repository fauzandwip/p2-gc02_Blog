import PropTypes from 'prop-types';

const ButtonBox = ({ id, onClick, children }) => {
	return (
		<button id={id} className="page-box" onClick={onClick}>
			{children}
		</button>
	);
};

export default ButtonBox;

ButtonBox.propTypes = {
	id: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.any,
};
