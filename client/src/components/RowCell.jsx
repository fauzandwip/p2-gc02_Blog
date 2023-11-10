import PropTypes from 'prop-types';
import ButtonNormal from './ButtonNormal';

const RowCell = ({ data, index }) => {
	return (
		<tr className="odd:bg-slate-800 even:bg-slate-700">
			<td className="p-3 border-e">{index + 1}</td>
			<td className="p-3 border-e w-1/6">
				<img src={data.imgUrl} alt="Image Post" className="w-96" />
			</td>
			<td className="p-3 border-e w-1/6">{data.title}</td>
			<td className="p-3 border-e w-1/2">
				<p className="line-clamp-3">{data.content}</p>
			</td>
			<td className="p-3 border-e">{data.Category.name}</td>
			<td className="p-3 border-e">{data.Author.username}</td>
			<td className="p-3 border-e">
				<div className="action flex flex-col gap-1">
					<ButtonNormal color={'teal'}>Edit</ButtonNormal>
					<ButtonNormal color={'red'}>Delete</ButtonNormal>
				</div>
			</td>
		</tr>
	);
};

export default RowCell;

RowCell.propTypes = {
	data: PropTypes.object,
	index: PropTypes.number,
};
