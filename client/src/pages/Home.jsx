import axios from 'axios';
import { useEffect, useState } from 'react';

const baseUrl = 'https://blog.fauzandp.online';
// const Authorization = localStorage.getItem('access_token');

function Home() {
	const [posts, setPosts] = useState([]);

	const [sort, setSort] = useState('createdAt');
	const [filter, setFilter] = useState([]);
	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	// const [pageRows, setPageRows] = useState([1]);

	const pageRows = [];
	for (let i = 1; i <= totalPage; i++) {
		pageRows.push(
			<button
				key={i}
				className="box page-post page-box"
				onClick={() => setCurrentPage(i)}
			>
				{i}
			</button>
		);
	}

	const toPrevNext = (e) => {
		const target = e.target;
		let id = target.id;

		if (!id) {
			if (target.matches('svg')) {
				id = target.parentNode.id;
			}

			if (target.matches('path')) {
				id = target.parentNode.parentNode.id;
			}
		}

		if (id === 'page-prev') {
			if (currentPage > 1) {
				setCurrentPage((prev) => prev - 1);
			}
			return;
		}

		if (id === 'page-next') {
			if (currentPage < totalPage) {
				setCurrentPage((prev) => prev + 1);
			}
			return;
		}
	};

	const onSelectSort = (e) => {
		// console.log(e.target.value);
		setSort(e.target.value);
	};

	const onCheck = (e) => {
		const categoryId = e.target.value;
		const newArr = [...filter];
		const index = filter.findIndex((val) => val === categoryId);

		if (index !== -1) {
			newArr.splice(index, 1);
			setFilter(newArr);
			return;
		}

		newArr.push(categoryId);
		setFilter(newArr);
	};

	const fetchPosts = async () => {
		let url = `${baseUrl}/pub/posts?search=${search}&sort=${sort}&page[number]=${currentPage}`;

		if (filter.length) {
			url += `&filter[category]=${filter.join(',')}`;
		}

		// console.log(url);
		try {
			const { data } = await axios({
				method: 'get',
				url,
			});
			// console.log('data', data.data.length);

			// console.log(data.totalPage);
			setTotalPage(data.totalPage);
			setPosts(data.data);
			// const pageRow = [];
			// for (let i = 1; i <= data.totalPage; i++) {
			// 	pageRow.push(i);
			// }
			// console.log('posts', pageRow);
			// setPageRows([...pageRow]);
			// console.log('posts', posts);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	useEffect(() => {
		fetchPosts();
	}, [search, currentPage, sort, filter]);

	return (
		<>
			<div
				id="home-page"
				className="w-full min-h-screen bg-slate-600 flex flex-col pt-28 pb-8 px-20 items-center justify-evenly"
			>
				{/* <div className="main-title text-5xl text-slate-100">Blog Website</div> */}

				<div className="main flex flex-row">
					{/* SEARCH FILTER SORT */}
					<div className="flex flex-col gap-6 items-center">
						{/* SEARCH FILTER */}
						<div className="search-filter w-max h-max text-slate-300 bg-slate-800 flex flex-col p-5 gap-4 rounded-lg">
							{/* SEARCH by title */}
							<div id="search-post" className="flex flex-col gap-1">
								<label htmlFor="search">Search</label>
								<input
									type="text"
									name="search"
									id="search"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									placeholder="search post"
									className="bg-slate-600 py-1 px-2 rounded-md"
								/>
							</div>

							{/* FILTER category */}
							<div id="filter-category" className="flex flex-col gap-2 pt-2">
								<p>Filter By Category</p>

								{['Sport', 'Fiction', 'Technology', 'Health'].map(
									(category, idx) => {
										return (
											<label
												key={idx}
												htmlFor={'category' + idx}
												className="flex gap-3 items-center"
												onChange={onCheck}
											>
												<input
													type="checkbox"
													name="sport"
													value={idx + 1}
													id={'category' + idx}
												/>
												{category}
											</label>
										);
									}
								)}
							</div>
						</div>

						{/* SORT SELECT */}
						<select
							name="sort-post"
							id="sort-post"
							className="p-3 bg-teal-500 w-full rounded-md"
							onChange={onSelectSort}
						>
							<option disabled>sort by</option>
							<option value="createdAt">oldest</option>
							<option value="-createdAt">newest</option>
						</select>
					</div>

					{/* CARDS */}
					<div className="cards flex flex-col gap-10">
						{/* cards */}
						<div
							id="post-cards"
							className="flex flex-wrap gap-2.5 justify-center items-start px-3 w-full"
						>
							{posts.map((post) => {
								return (
									<div
										key={post.id}
										className="card flex flex-col items-center bg-teal-600 w-48 h-60 overflow-hidden rounded-sm"
									>
										<img
											src={post.imgUrl}
											alt={post.title}
											className="rounded-t-sm w-full h-3/4 object-cover"
										/>
										<div className="title text-white flex items-center text-center p-2">
											{post.title}
										</div>
									</div>
								);
							})}
						</div>

						<div className="pagination flex justify-center gap-8">
							{/* prev btn */}
							<button id="page-prev" className="page-box" onClick={toPrevNext}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 19.5L8.25 12l7.5-7.5"
									/>
								</svg>
							</button>

							{/* pagination */}
							<div id="page-posts" className="flex flex-row gap-1">
								{pageRows}
							</div>

							{/* next btn */}
							<button id="page-next" className="page-box" onClick={toPrevNext}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M8.25 4.5l7.5 7.5-7.5 7.5"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
