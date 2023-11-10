import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from '../api';
import helper from '../helpers';
import ButtonNormal from '../components/ButtonNormal';
import Form from '../components/Form';
import Input from '../components/Input';
import Select from '../components/Select';
import TextArea from '../components/TextArea';

const FormPost = ({
	isOpen,
	post,
	setPost,
	onClose,
	titleForm,
	fetchPosts,
}) => {
	const { id, title, content, imgUrl, categoryId } = post;

	const [categories, setCategories] = useState([]);

	const fetchCategories = async () => {
		try {
			const { data } = await axios.get('/categories', {
				headers: {
					Authorization: helper.access_token,
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
			if (id) {
				await axios.put(
					`/posts/${id}`,
					{
						title: title,
						content: content,
						categoryId: Number(categoryId),
						imgUrl: imgUrl,
					},
					{
						headers: {
							Authorization: helper.access_token,
						},
					}
				);
			} else {
				await axios.post(
					'/posts',
					{
						title: title,
						content: content,
						categoryId: Number(categoryId),
						imgUrl: imgUrl,
					},
					{
						headers: {
							Authorization: helper.access_token,
						},
					}
				);
			}

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
					className="text-slate-100 fixed top-0 w-full h-screen z-9 bg-slate-600/50 backdrop-blur-sm flex justify-center items-center"
					onClick={onClose}
				></div>

				{/* FORM */}
				<Form onSubmit={handleOnSubmit} className={'w-1/2 z-10'}>
					<div className="text-4xl text-center mb-4">{titleForm}</div>
					<Input
						labelName={'Title'}
						id={'title-post-form'}
						value={title}
						onChange={(e) => {
							setPost((prev) => {
								return { ...prev, title: e.target.value };
							});
						}}
						placeholder={'title'}
						isRequired={true}
					/>
					<Select
						id={'categoryId-post-form'}
						labelName={'Category'}
						title={'Category'}
						options={categories}
						value={`${categoryId}`}
						isRequired={true}
						onChange={(e) => {
							setPost((prev) => {
								return { ...prev, categoryId: e.target.value };
							});
						}}
					/>
					<Input
						labelName={'Image URL'}
						id={'imgUrl-post-form'}
						value={imgUrl}
						onChange={(e) => {
							setPost((prev) => {
								return { ...prev, imgUrl: e.target.value };
							});
						}}
						placeholder={'https://example.com'}
					/>
					<TextArea
						labelName={'Content'}
						id={'textarea-post-form'}
						rows={7}
						onChange={(e) => {
							setPost((prev) => {
								return { ...prev, content: e.target.value };
							});
						}}
						placeholder={'jackkk sparrow .....'}
						isRequired={true}
						value={content}
					/>
					<ButtonNormal type={'submit'} color={'teal-light'}>
						Submit
					</ButtonNormal>
				</Form>
			</div>
		</>
	);
};

export default FormPost;

FormPost.propTypes = {
	isOpen: PropTypes.bool,
	post: PropTypes.object,
	setPost: PropTypes.func,
	onClose: PropTypes.func,
	titleForm: PropTypes.string,
	fetchPosts: PropTypes.func,
};
