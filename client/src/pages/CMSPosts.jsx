import { useEffect, useState } from 'react';
import axios from '../api';
import ButtonNormal from '../components/ButtonNormal';
import Table from '../components/Table';
import Loading from '../components/Loading';
import Error from '../components/Error';
import FormPost from './FormPost';

const CMSPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [posts, setPosts] = useState([]);
	const [post, setPost] = useState({
		id: undefined,
		title: '',
		content: '',
		categoryId: undefined,
		imgUrl: '',
	});
	const [open, setOpen] = useState({
		add: false,
		edit: false,
	});

	const fetchPosts = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get('/posts', {
				headers: {
					Authorization: localStorage.getItem('access_token'),
				},
			});
			setPosts(data);
		} catch (error) {
			console.log(error);
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const onClick = (type, data) => {
		switch (type) {
			case 'add':
				setOpen((prev) => {
					return {
						...prev,
						add: true,
					};
				});
				break;
			case 'edit':
				setPost(data);
				setOpen((prev) => {
					return {
						...prev,
						edit: true,
					};
				});
				break;
		}
	};

	const onClose = (e) => {
		e.preventDefault();

		setOpen({
			add: false,
			edit: false,
		});
		setPost({
			id: undefined,
			title: '',
			content: '',
			categoryId: undefined,
			imgUrl: '',
		});
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
				<Table tableHeads={tableHeads} datas={posts} onClick={onClick} />
			</div>
			{/* ADD POST */}
			<FormPost
				post={post}
				setPost={setPost}
				isOpen={open.add}
				onClose={(e) => onClose(e)}
				titleForm={'Add New Post'}
				fetchPosts={fetchPosts}
			></FormPost>

			{/* EDIT POST */}
			<FormPost
				post={post}
				setPost={setPost}
				isOpen={open.edit}
				onClose={(e) => onClose(e)}
				titleForm={'Edit Post'}
				fetchPosts={fetchPosts}
			></FormPost>
		</>
	);
};

export default CMSPosts;
