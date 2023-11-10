import PropTypes from 'prop-types';
import RowCell from './RowCell';

const Table = ({ tableHeads, datas, onClick }) => {
	return (
		<table className="table table-fixed border border-slate-100 m-4">
			<thead>
				<tr className="border-b border-slate-100 bg-teal-600">
					{tableHeads.map((head) => {
						return (
							<th key={head} scope="col" className="p-3 border-e">
								{head}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{datas.map((data, idx) => {
					return (
						<RowCell key={data.id} data={data} index={idx} onClick={onClick} />
					);
				})}
			</tbody>
		</table>
	);
};

export default Table;

Table.propTypes = {
	tableHeads: PropTypes.array,
	datas: PropTypes.array,
	onClick: PropTypes.func,
};
