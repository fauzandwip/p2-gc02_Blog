import PropTypes from 'prop-types';
import ButtonNormal from './ButtonNormal';
import { useState } from 'react';

const RowCell = ({ data, index, onClick }) => {
	const { id, title, imgUrl, content, categoryId, Category, Author } = data;

	const [display, setDisplay] = useState('hidden');

	const onHover = () => {
		setDisplay('block');
	};

	const onMouseLeave = () => {
		setDisplay('hidden');
	};

	return (
		<tr className="odd:bg-slate-800 even:bg-slate-700">
			<td className="p-3 border-e">{index + 1}</td>
			<td
				className="p-3 border-e w-1/6 relative"
				onMouseOver={onHover}
				onMouseLeave={onMouseLeave}
			>
				<img src={imgUrl} alt="Image Post" className="w-96" />
				<div
					onClick={() => onClick('upload', { id })}
					className={`bg-teal-600/80 z-30 w-full h-full absolute top-0 left-0 flex justify-center items-center hover:cursor-pointer ${display}`}
				>
					<svg
						className="w-8 h-8 mb-4 text-slate-100 dark:text-slate-100"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 16"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
						/>
					</svg>
				</div>
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
					<ButtonNormal color={'red'} onClick={() => onClick('delete', { id })}>
						Delete
					</ButtonNormal>
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
