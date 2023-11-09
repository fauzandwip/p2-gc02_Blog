import PropTypes from 'prop-types';

const Card = ({ data }) => {
	return (
		<div className="card flex flex-col items-center bg-teal-600 w-48 h-60 overflow-hidden rounded-sm hover:z-10 hover:cursor-pointer hover:shadow-xl ease-in-out duration-200 hover:scale-110 hover:shadow-slate-800">
			<div className="top-card w-full h-3/4">
				<img
					src={data.imgUrl}
					alt={data.title}
					className="rounded-t-sm w-full h-full object-cover"
				/>
				<div className="bg-teal-800 px-2 rounded-full text-slate-100 text-[10px] w-max -translate-y-6 translate-x-2">
					{data.Category.name}
				</div>
			</div>
			<div className="title text-white text-center p-2">{data.title}</div>
		</div>
	);
};

export default Card;

Card.propTypes = {
	data: PropTypes.object,
};
