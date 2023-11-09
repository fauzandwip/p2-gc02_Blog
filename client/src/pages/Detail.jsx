import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Detail = () => {
	const { id } = useParams();

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [post, setPost] = useState({});

	const fetchPost = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get(`/pub/posts/${id}`);
			console.log(data);
			setPost(data);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPost();
	}, []);

	if (isLoading) return <Loading></Loading>;
	if (error) return <Error error={error} />;

	return (
		<div className="detail-post w-full h-screen flex flex-col items-center container pt-28 px-20 mx-auto gap-10 py-10">
			<div className="head-section w-full flex flex-col items-center gap-2">
				<div className="text-center text-4xl font-bold">{post.title}</div>
				<div className="category bg-teal-600 inline-block px-2 rounded-full text-white">
					{post.Category.name}
				</div>
				<div className="author">{post.Author.username}</div>
			</div>

			<img className="w-3/4 max-h-96" src={post.imgUrl} alt="Image Post" />
			<div className="content">{post.content}</div>
		</div>
	);
};

export default Detail;
