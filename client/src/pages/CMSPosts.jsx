import { useEffect, useState } from 'react';
import axios from '../api';
import ButtonNormal from '../components/ButtonNormal';
import Table from '../components/Table';
import Loading from '../components/Loading';
import Error from '../components/Error';

const CMSPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [posts, setPosts] = useState([]);

	const fetchPosts = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get('/posts', {
				headers: {
					Authorization: localStorage.getItem('access_token'),
				},
			});
			console.log(data);
			setPosts(data);
		} catch (error) {
			console.log(error);
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	if (isLoading) {
		return <Loading bgColor={'bg-slate-800'} color={'text-slate-100'} />;
	}

	if (error) {
		return <Error />;
	}

	const tableHeads = [
		'ID',
		'Image',
		'Title',
		'Content',
		'Category',
		'Author',
		'Action',
	];

	return (
		<div className="px-20 pb-10 pt-24 bg-slate-800 text-slate-100 min-h-screen">
			<div className="top-section flex justify-between m-4">
				<div className="title text-4xl font-bold">List of Post</div>
				<ButtonNormal color={'teal'}>Create</ButtonNormal>
			</div>
			<Table tableHeads={tableHeads} datas={posts} />
		</div>
	);
};

export default CMSPosts;
