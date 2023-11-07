// const axios = require('axios').default;

const baseUrl = 'https://blog.fauzandp.online';

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

	fetchPosts();
	// fetchCategories();

	document.getElementById('search-post').addEventListener('input', fetchPosts);
	document.getElementById('sort-post').addEventListener('change', fetchPosts);
};

init();
