// const axios = require('axios').default;

const baseUrl = 'https://blog.fauzandp.online';

const changePage = (page) => {
	const list_page = {
		home: document.getElementById('home-page'),
		login: document.getElementById('login-page'),
		createPost: document.getElementById('create-post-page'),
	};

	console.log('change', page);
	for (const key in list_page) {
		list_page[key].classList.add('hidden');
	}

	// const showDisplay = (page) => {
	// };
	switch (page) {
		case 'home':
			list_page.home.classList.remove('hidden');
			break;
		case 'login':
			list_page.login.classList.remove('hidden');
			break;
		case 'createPost':
			setupCreatePostPage();
			list_page.createPost.classList.remove('hidden');
			break;

		default:
			break;
	}
	list_page[page].classList.remove('hidden');
};

const handleLogin = async (e) => {
	e.preventDefault();
	console.log('loginnnn');

	try {
		const email = document.getElementById('email-login').value;
		const password = document.getElementById('password-login').value;

		const { data } = await axios.post(`${baseUrl}/login`, {
			email,
			password,
		});

		localStorage.setItem('access_token', data.access_token);
		changePage('createPost');
	} catch (error) {
		console.log(error);
	}
};

const fetchPosts = async (e) => {
	try {
		const searchValue = document.getElementById('search').value;
		const sortBy = document.getElementById('sort-post').value;
		let currentPage = 1;

		if (e) {
			const classList = [...e.target.classList];
			// console.log(e.target.id);
			if (classList.includes('page-post')) {
				currentPage = e.target.value;
			}
			// if (e.target.id === 'page-prev') {
			// 	if (currentPage > 1) {
			// 		currentPage -= 1;
			// 	}
			// }
			// if (e.target.id === 'page-next') {
			// 	if (currentPage < data.totalPage) {
			// 		currentPage += 1;
			// 	}
			// }
			// console.log(currentPage);
		}

		const { data } = await axios({
			method: 'get',
			url: `${baseUrl}/pub/posts?search=${searchValue}&sort=${sortBy}&page[number]=${currentPage}`,
		});
		// console.log(data.data);
		// console.log(sortBy);

		const elements = data.data.map((post) => {
			return `
		  <div
		    class="card flex flex-col items-center bg-teal-600 w-52 h-24 overflow-hidden rounded-sm"
		  >
		    <img
		      src="${post.imgUrl}"
		      alt="${post.title}"
		      class="rounded-t-sm w-full h-full object-cover"
		    />
		    <div class="title text-white flex items-center text-center p-2">
		      ${post.title}
		    </div>
		  </div>
		`;
		});

		const cards_posts = document.getElementById('post-cards');
		cards_posts.innerHTML = elements.join('');

		const page_boxs = document.getElementById('page-posts');
		page_boxs.innerHTML = '';

		for (let i = 1; i <= data.totalPage; i++) {
			const btnPage = document.createElement('button');
			btnPage.classList.add('box', 'page-post', 'page-box');
			btnPage.value = i;
			btnPage.innerText = i;
			btnPage.addEventListener('click', fetchPosts);
			// console.log(btnPage);
			page_boxs.appendChild(btnPage);
			// pageBoxs.push(`<button class="box page-box" value=${i}>${i}</button>`);
		}
	} catch (error) {
		console.log(error);
	}
};

const setupCreatePostPage = async () => {
	try {
		const { data } = await axios.get(`${baseUrl}/categories`, {
			headers: {
				Authorization: localStorage.getItem('access_token'),
			},
		});
		// console.log(data);

		const category_select = document.getElementById('category-post-form');
		data.forEach((obj) => {
			const optionCategory = document.createElement('option');
			optionCategory.value = obj.id;
			optionCategory.innerText = obj.name;
			category_select.appendChild(optionCategory);
		});
	} catch (error) {
		console.log(error);
	}
};

const createPost = async (e) => {
	e.preventDefault();
	console.log('create posttt');

	try {
		const title = document.getElementById('title-post-form').value;
		const category = document.getElementById('category-post-form').value;
		const imgUrl = document.getElementById('imgUrl-post-form').value;
		const content = document.getElementById('content-post-form').value;

		await axios.post(
			`${baseUrl}/posts`,
			{
				title,
				categoryId: category,
				imgUrl,
				content,
			},
			{
				headers: {
					Authorization: localStorage.getItem('access_token'),
				},
			}
		);

		changePage('home');
	} catch (error) {
		console.log(error);
	}
};

// const fetchCategories = async () => {
// 	try {
// 		const { data } = await axios({
// 			method: 'get',
// 			url: `${baseUrl}/pub/posts?page[size]=2`,
// 		});
// 		console.log(data.data);

// 		const elements = data.data.map((post) => {
// 			return `
// 		  <div
// 		    class="card flex flex-col items-center bg-teal-600 w-52 h-24 overflow-hidden rounded-sm"
// 		  >
// 		    <img
// 		      src="${post.imgUrl}"
// 		      alt="${post.title}"
// 		      class="rounded-t-sm w-full h-full object-cover"
// 		    />
// 		    <div class="title text-white flex items-center text-center p-2">
// 		      ${post.title}
// 		    </div>
// 		  </div>
// 		`;
// 		});

// 		const cards_posts = document.getElementById('post-cards');
// 		cards_posts.innerHTML = elements;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

const init = () => {
	console.log('testtttt');
	document.getElementById('page-prev').addEventListener('click', fetchPosts);
	document.getElementById('page-next').addEventListener('click', fetchPosts);

	document.getElementById('search-post').addEventListener('input', fetchPosts);
	document.getElementById('sort-post').addEventListener('change', fetchPosts);

	document.getElementById('login-form').addEventListener('submit', handleLogin);
	document
		.getElementById('create-post-form')
		.addEventListener('submit', createPost);

	changePage('login');

	fetchPosts();
	// fetchCategories();
};

init();
