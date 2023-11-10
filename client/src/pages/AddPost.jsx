import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from '../api';
import helper from '../helpers';
import ButtonNormal from '../components/ButtonNormal';
import Form from '../components/Form';
import Input from '../components/Input';
import Select from '../components/Select';
import TextArea from '../components/TextArea';

const AddPost = ({ isOpen, onClose, fetchPosts }) => {
	const [title, setTitle] = useState('');
	const [imgUrl, setImgURL] = useState('');
	const [categoryId, setCategoryId] = useState('default');
	const [categories, setCategories] = useState([]);
	const [content, setContent] = useState('');

	const fetchCategories = async () => {
		try {
			const { data } = await axios.get('/categories', {
				headers: {
					Authorization: localStorage.getItem('access_token'),
				},
			});

			setCategories(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post(
				'/posts',
				{
					title,
					content,
					categoryId: Number(categoryId),
					imgUrl,
				},
				{
					headers: {
						Authorization: helper.access_token,
					},
				}
			);

			onClose(e);
			fetchPosts();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<>
			<div
				className={`text-slate-100 fixed top-0 w-full h-screen z-10 flex justify-center items-center ${
					isOpen ? '' : 'hidden'
				}`}
			>
				{/* OUTER BACKGROUND */}
				<div
					className={`text-slate-100 fixed top-0 w-full h-screen z-9 bg-slate-600/50 backdrop-blur-sm flex justify-center items-center ${
						isOpen ? '' : 'hidden'
					}`}
					onClick={onClose}
				></div>

				{/* FORM */}
				<Form onSubmit={handleOnSubmit} className={'w-1/2 z-10'}>
					<div className="text-4xl text-center mb-4">Add New Post</div>
					<Input
						labelName={'Title'}
						id={'title-post-form'}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder={'title'}
						isRequired={true}
					/>
					<Select
						id={'categoryId-post-form'}
						labelName={'Category'}
						title={'Category'}
						options={categories}
						value={categoryId}
						isRequired={true}
						onChange={(e) => setCategoryId(e.target.value)}
					/>
					<Input
						labelName={'Image URL'}
						id={'imgUrl-post-form'}
						value={imgUrl}
						onChange={(e) => setImgURL(e.target.value)}
						placeholder={'https://example.com'}
					/>
					<TextArea
						labelName={'Content'}
						id={'textarea-post-form'}
						rows={7}
						onChange={(e) => setContent(e.target.value)}
						placeholder={'jackkk sparrow .....'}
						isRequired={true}
						value={content}
					/>
					<ButtonNormal
						onClick={() => console.log('clickk')}
						type={'submit'}
						color={'teal-light'}
					>
						Submit
					</ButtonNormal>
				</Form>
			</div>
		</>
	);
};

export default AddPost;

AddPost.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	fetchPosts: PropTypes.func,
};
