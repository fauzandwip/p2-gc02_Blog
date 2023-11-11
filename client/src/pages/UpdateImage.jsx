import PropTypes from 'prop-types';
import InputFile from '../components/InputFile';
import ButtonNormal from '../components/ButtonNormal';
import { useState } from 'react';
import axios from '../api';
import Swal from 'sweetalert2';

const UpdateImage = ({ post, isOpen, onClose, fetchPosts }) => {
	const [backgroundImage, setBackgroundImage] = useState('');
	const [image, setImage] = useState('');

	const onChange = async (e) => {
		const image = e.target.files[0];

		if (image) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setBackgroundImage(e.target.result);
				setImage(image);
			};
			reader.readAsDataURL(image);
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append('imageUrl', image);
			const { data } = await axios.patch(
				`/posts/${post.id}/img-url`,
				formData,
				{
					headers: {
						Authorization: localStorage.getItem('access_token'),
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			Swal.fire({
				title: data.message,
				icon: 'success',
			});
			setImage('');
			onClose(e);
			fetchPosts();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			className={`text-slate-100 fixed top-0 w-full h-screen z-30 flex justify-center items-center ${
				isOpen ? '' : 'hidden'
			}`}
		>
			{/* OUTER BACKGROUND */}
			<div
				className="text-slate-100 fixed top-0 z-20 w-full h-screen bg-slate-600/50 backdrop-blur-sm flex justify-center items-center"
				onClick={onClose}
			></div>
			<form
				onSubmit={onSubmit}
				className="w-1/2 h-3/4 z-30 flex flex-col justify-center items-center gap-5"
			>
				<div className="font-bold text-4xl mb-8">Update Image</div>
				<InputFile
					backgroundImage={backgroundImage}
					addClassName={'w-full h-3/4'}
					onChange={onChange}
				/>
				<ButtonNormal color={'teal'} onClick={onSubmit} addClassName={'w-full'}>
					Upload
				</ButtonNormal>
			</form>
		</div>
	);
};

export default UpdateImage;

UpdateImage.propTypes = {
	isOpen: PropTypes.bool,
	post: PropTypes.object,
	onClose: PropTypes.func,
	fetchPosts: PropTypes.func,
};
