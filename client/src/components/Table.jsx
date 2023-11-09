import PropTypes from 'prop-types';
import RowCell from './RowCell';

const Table = ({ tableHeads, datas }) => {
	return (
		<table className="table table-fixed border border-slate-100 m-4">
			<thead className="table-header-group border-b border-slate-100 bg-teal-600">
				{tableHeads.map((head) => {
					return (
						<th key={head} className="table-cell p-3 border-e">
							{head}
						</th>
					);
				})}
			</thead>
			<tbody className="table-row-group">
				{datas.map((data, idx) => {
					return <RowCell key={data.id} data={data} index={idx} />;
				})}
			</tbody>
		</table>
	);
};

export default Table;

Table.propTypes = {
	tableHeads: PropTypes.array,
	datas: PropTypes.array,
};
