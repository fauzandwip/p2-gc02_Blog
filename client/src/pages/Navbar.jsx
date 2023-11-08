function Navbar() {
	return (
		<>
			<nav className="flex justify-between items-center fixed w-full bg-gray-800 py-2 px-4 shadow-md shadow-teal-500">
				<div>
					<img
						src="https://images.tokopedia.net/img/FZfiOH/2021/6/11/9cc90aa3-90d4-4560-bf75-c881573fc2d4.png"
						alt="Hacktiv8 Logo"
						className="w-14"
					/>
				</div>
				<div className="py-2 px-4 text-white h-10 rounded-lg bg-teal-600">
					Sign In
				</div>
			</nav>
		</>
	);
}

export default Navbar;
