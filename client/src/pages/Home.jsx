import axios from '../api';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import ButtonBox from '../components/ButtonBox';
import CheckBox from '../components/CheckBox';
import Input from '../components/Input';
import Select from '../components/Select';
import Loading from '../components/Loading';
import Error from '../components/Error';

function Home() {
	const [posts, setPosts] = useState([]);

	const [sort, setSort] = useState('createdAt');
	const [filter, setFilter] = useState([]);
	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	// const [pageRows, setPageRows] = useState([1]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const options = {
		oldest: 'createdAt',
		newest: '-createdAt',
	};

	const pageRows = [];
	for (let i = 1; i <= totalPage; i++) {
		pageRows.push(
			<ButtonBox key={i} onClick={() => setCurrentPage(i)}>
				{i}
			</ButtonBox>
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
		let url = `/pub/posts?search=${search}&sort=${sort}&page[number]=${currentPage}`;

		if (filter.length) {
			url += `&filter[category]=${filter.join(',')}`;
		}

		// console.log(url);
		try {
			setIsLoading(true);
			const { data } = await axios({
				method: 'get',
				url,
			});
			// console.log('data', data.data.length);

			// console.log(data.totalPage);
			if (currentPage > data.totalPage) setCurrentPage(1);
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
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	useEffect(() => {
		fetchPosts();
	}, [search, currentPage, sort, filter]);

	if (isLoading)
		return <Loading bgColor={'bg-slate-600'} color={'text-white'} />;
	if (error) return <Error error={error} />;

	return (
		<>
			<div
				id="home-page"
				className="w-full min-h-screen bg-slate-600 flex flex-col pt-28 pb-8 px-20 items-center justify-evenly"
			>
				{/* <div className="main-title text-5xl text-slate-100">Blog Website</div> */}

				<div id="main" className="flex flex-row w-full">
					{/* SEARCH FILTER SORT */}
					<div className="flex flex-col gap-6 items-center w-1/5">
						{/* SEARCH FILTER */}
						<div className="w-max h-max text-slate-300 bg-slate-800 flex flex-col p-5 gap-4 rounded-lg">
							{/* SEARCH by title */}
							<Input
								labelName={'Search'}
								id={'search'}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder={'search post'}
							/>

							{/* FILTER category */}
							<div className="flex flex-col gap-2 pt-2">
								<p>Filter By Category</p>

								{['Sport', 'Fiction', 'Technology', 'Health'].map(
									(category, idx) => {
										return (
											<CheckBox
												key={idx}
												id={idx}
												onChange={onCheck}
												text={category}
											/>
										);
									}
								)}
							</div>
						</div>

						{/* SORT SELECT */}
						<Select
							title={'sort by'}
							options={options}
							onChange={onSelectSort}
						/>
					</div>

					{/* CARDS */}
					<div className="flex flex-col gap-10 w-full">
						{/* cards */}
						<div className="flex flex-wrap gap-2.5 justify-center items-start px-3">
							{posts.map((post) => {
								return <Card key={post.id} data={post} />;
							})}
						</div>

						{/* paginations */}
						<div className="pagination flex justify-center gap-8">
							{/* prev btn */}
							<ButtonBox id={'page-prev'} onClick={toPrevNext}>
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
							</ButtonBox>

							{/* pagination */}
							<div id="page-posts" className="flex flex-row gap-1">
								{pageRows}
							</div>

							{/* next btn */}
							<ButtonBox id={'page-next'} onClick={toPrevNext}>
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
							</ButtonBox>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
