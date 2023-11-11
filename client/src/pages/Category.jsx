import { useEffect, useState } from 'react';
import axios from '../api';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Category = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [categories, setCategories] = useState([]);

	const fetchCategories = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get('/categories', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('access_token')}`,
				},
			});
			setCategories(data);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	if (isLoading) {
		return (
			<Loading bgColor={'bg-slate-800'} color={'text-slate-100'}>
				...
			</Loading>
		);
	}

	if (error) {
		return <Error />;
	}

	return (
		<div className="px-20 pb-10 pt-36 w-full h-screen bg-slate-800 text-slate-100 flex flex-col items-center">
			<div className="text-4xl font-bold mb-8">List of Category</div>
			<table className="border border-slate-100 border-collapse table-auto w-1/4">
				<thead>
					<tr className="border-b border-slate-100 bg-teal-600">
						<th scope="col" className="p-3 border-e">
							ID
						</th>
						<th scope="col" className="p-3 border-e">
							Name
						</th>
					</tr>
				</thead>
				<tbody>
					{categories.map(({ id, name }, idx) => {
						return (
							<tr key={id} className="text-center">
								<td className="p-3 border-e w-16">{idx + 1}</td>
								<td className="p-3">{name}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Category;
