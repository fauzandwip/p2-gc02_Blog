import PropTypes from 'prop-types';
import ButtonNormal from './ButtonNormal';

const RowCell = ({ data, index, onClick }) => {
	const { id, title, imgUrl, content, categoryId, Category, Author } = data;
	return (
		<tr className="odd:bg-slate-800 even:bg-slate-700">
			<td className="p-3 border-e">{index + 1}</td>
			<td className="p-3 border-e w-1/6">
				<img src={imgUrl} alt="Image Post" className="w-96" />
			</td>
			<td className="p-3 border-e w-1/6">{title}</td>
			<td className="p-3 border-e w-1/2">
				<p className="line-clamp-3">{content}</p>
			</td>
			<td className="p-3 border-e">{Category.name}</td>
			<td className="p-3 border-e">{Author.username}</td>
			<td className="p-3 border-e">
				<div className="action flex flex-col gap-1">
					<ButtonNormal
						color={'teal'}
						onClick={() =>
							onClick('edit', {
								id,
								title,
								content,
								imgUrl,
								categoryId,
							})
						}
					>
						Edit
					</ButtonNormal>
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
	onClick: PropTypes.func,
};
