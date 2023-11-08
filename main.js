// const axios = require('axios').default;

const baseUrl = 'https://blog.fauzandp.online';
const Authorization = localStorage.getItem('access_token');

const changePage = (page) => {
	const list_page = {
		home: document.getElementById('home-page'),
		login: document.getElementById('login-page'),
		createPost: document.getElementById('create-post-page'),
		cmsPost: document.getElementById('cms-post-page'),
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
		case 'cmsPost':
			fetchPostsCMS();
			list_page.cmsPost.classList.remove('hidden');
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
		changePage('cmsPost');
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

const fetchPostsCMS = async () => {
	try {
		console.log(Authorization);
		const { data } = await axios.get(`${baseUrl}/posts`, {
			headers: {
				Authorization,
			},
		});
		// console.log(data);

		const elements = data.map((post, i) => {
			return `
            <tr class="table-row odd:bg-slate-800 even:bg-slate-700">
							<td class="table-cell p-3 border-e">${++i}</td>
							<td class="table-cell p-3 border-e">
								<img
									src="${post.imgUrl}"
									alt="Image Post"
									class="w-96"
								/>
							</td>
							<td class="table-cell p-3 border-e w-1/6">${post.title}</td>
							<td class="table-cell p-3 border-e w-1/2">
								<p class="line-clamp-3">
									${post.content}
								</p>
							</td>
							<td class="table-cell p-3 border-e">${post.Category.name}</td>
							<td class="table-cell p-3 border-e">${post.Author.username}</td>
							<td class="table-cell p-3 border-e">
								<div class="action flex flex-col gap-1">
									<button
										class="bg-teal-600 py-1 px-4 rounded-sm flex justify-center hover:bg-teal-700 active:bg-teal-800"
									>
										Edit
									</button>
									<button
										class="bg-red-500 py-1 px-4 rounded-sm flex justify-center hover:bg-red-600 active:bg-red-800"
									>
										Delete
									</button>
								</div>
							</td>
						</tr>
		`;
		});

		const cards_posts = document.getElementById('table-post-cms');
		cards_posts.innerHTML = elements.join('');
	} catch (error) {
		console.log(error);
	}
};

const setupCreatePostPage = async () => {
	try {
		const { data } = await axios.get(`${baseUrl}/categories`, {
			headers: {
				Authorization,
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
					Authorization,
				},
			}
		);

		changePage('cmsPost');
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

	changePage('cmsPost');

	fetchPosts();
	// fetchCategories();
};

init();
