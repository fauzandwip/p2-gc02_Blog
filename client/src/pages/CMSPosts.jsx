import { useEffect, useState } from 'react';
import axios from '../api';
import ButtonNormal from '../components/ButtonNormal';
import Table from '../components/Table';
import Loading from '../components/Loading';
import Error from '../components/Error';
import AddPost from './AddPost';

const CMSPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState({
		add: false,
	});

	console.log('trigerr');
	const fetchPosts = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get('/posts', {
				headers: {
					Authorization: localStorage.getItem('access_token'),
				},
			});
			// console.log('trigerr fetch');
			setPosts(data);
		} catch (error) {
			console.log(error);
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const onClick = (type) => {
		switch (type) {
			case 'add':
				setOpen({
					...open,
					add: true,
				});
				break;

			default:
				break;
		}
		// console.log(open);
	};

	const onClose = (e, type) => {
		e.preventDefault();

		switch (type) {
			case 'add':
				setOpen({
					...open,
					add: false,
				});
				break;

			default:
				break;
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
		<>
			<div className="px-20 pb-10 pt-24 bg-slate-800 text-slate-100 min-h-screen">
				<div className="top-section flex justify-between m-4 mb-8">
					<div className="title text-4xl font-bold">List of Post</div>
					<ButtonNormal color={'teal'} onClick={() => onClick('add')}>
						Create
					</ButtonNormal>
				</div>
				<Table tableHeads={tableHeads} datas={posts} />
			</div>
			<AddPost
				isOpen={open.add}
				onClose={(e) => onClose(e, 'add')}
				fetchPosts={fetchPosts}
			></AddPost>
		</>
	);
};

export default CMSPosts;
