import PropTypes from 'prop-types';

const Card = ({ data }) => {
	return (
		<div className="card flex flex-col items-center bg-teal-600 w-48 h-60 overflow-hidden rounded-sm">
			<img
				src={data.imgUrl}
				alt={data.title}
				className="rounded-t-sm w-full h-3/4 object-cover"
			/>
			<div className="title text-white flex items-center text-center p-2">
				{data.title}
			</div>
		</div>
	);
};

export default Card;

Card.propTypes = {
	data: PropTypes.object,
};
