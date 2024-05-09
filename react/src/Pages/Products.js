import React, { useContext, useEffect, useState } from "react"
import { Breadcrumb, Dropdown, Form, Pagination, Table } from "react-bootstrap"
import { DataContext } from "../Components/DataContext"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faSpinner, faX } from "@fortawesome/free-solid-svg-icons"
import StarRating from "../Components/StarRating"

const Products = () => {
	const {
		data,
		setData,
		setDataPathName,
		pageSizeOptions,
		pageSize,
		setPageSize,
		currentPage,
		setCurrentPage,
		totalFilteredCount,
		categories,
		category,
		setCategory,
	} = useContext(DataContext)

	useEffect(() => {
		setDataPathName("products")
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const [showSearchInput, setShowSearchInput] = useState(false)

	const [searchTerm, setSearchTerm] = useState("")

	const filteredData = data?.filter((user) => {
		const searchText = searchTerm.toLowerCase()
		return Object.values(user).some((value) =>
			typeof value === "string"
				? value.toLowerCase().includes(searchText)
				: false
		)
	})

	const navigateTo = useNavigate()

	const handleSearchIconClick = () => {
		setShowSearchInput((showSearchInput) => !showSearchInput)
		setSearchTerm("")
	}

	const resetFilterChange = (filterType, value) => {
		if (value !== "All") setData()
		// Reset all filters based on the filterType being changed
		switch (filterType) {
			default:
				break
		}
		setCurrentPage(1) // Reset to first page when changing any filter
	}

	const handlePageSizeChange = (size) => {
		if (size !== pageSize) setData()
		setPageSize(size)
		setCurrentPage(1) // Reset to first page when changing any filter
	}

	const handleSearchInputChange = (e) => {
		setSearchTerm(e.target.value)
		// setCurrentPage(1) // Reset to first page when changing search term
	}

	// Calculate total number of pages based on pageSize and total filtered users count
	const totalPages = Math.ceil(totalFilteredCount / pageSize)

	const handlePageChange = (page) => {
		if (page !== currentPage) setData()
		setCurrentPage(page)
	}

	const handleCategoryChange = (category) => {
		setCategory(category)
		resetFilterChange("category", category)
	}

	const [categorySearchQuery, setCategorySearchQuery] = useState("")
	// Filter categories based on search query
	const filteredCategories = categories.filter((category) =>
		category
			.toString()
			.toLowerCase()
			.includes(categorySearchQuery.toLowerCase())
	)

	return (
		<div className="px-5 mt-5">
			<Breadcrumb className="custom-breadcrumb py-2 mb-5">
				<Breadcrumb.Item
					className="ms-auto my-0 py-0"
					onClick={() => navigateTo("/")}
				>
					Home
				</Breadcrumb.Item>
				<Breadcrumb.Item active className="me-auto my-0 py-0">
					Products
				</Breadcrumb.Item>
			</Breadcrumb>

			{/* Filter Section */}
			<div className="filter-container">
				<Form.Group className="filter-dropdown">
					<Dropdown>
						<Dropdown.Toggle
							variant="primary"
							className="customBg-black customColor-yellow"
							id="dropdown-page-size"
						>
							Entries: {pageSize}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{pageSizeOptions.map((size) => (
								<Dropdown.Item
									key={size}
									onClick={() => handlePageSizeChange(size)}
								>
									{size}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
				</Form.Group>

				<div className="search-container">
					{showSearchInput && (
						<Form.Control
							type="text"
							placeholder="Search..."
							value={searchTerm}
							onChange={handleSearchInputChange}
						/>
					)}
					<FontAwesomeIcon
						icon={showSearchInput ? faX : faSearch}
						className="mx-2 cursor-pointer"
						onClick={handleSearchIconClick}
					/>
				</div>

				<Form.Group className="filter-dropdown">
					<Dropdown>
						<Dropdown.Toggle
							disabled={
								!filteredCategories.filter((_) => _ !== "All")
									.length
							}
							variant="primary"
							className="customBg-black customColor-yellow"
							id="dropdown-category"
						>
							Category: {category}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{/* Search input */}
							<Form.Control
								type="text"
								placeholder="Search categories..."
								value={categorySearchQuery}
								onChange={(e) =>
									setCategorySearchQuery(e.target.value)
								}
								style={{ marginBottom: "8px" }}
							/>

							{/* Display filtered category options */}
							{filteredCategories.map((category, i) => (
								<Dropdown.Item
									key={i}
									onClick={() =>
										handleCategoryChange(category)
									}
								>
									{category}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
				</Form.Group>
			</div>

			{/* Table */}
			<div className="table-responsive">
				<Table striped bordered hover responsive>
					<thead>
						<tr className="customBg-grey">
							<th>Title</th>
							<th>Price</th>
							<th>Rating</th>
							<th>Stock</th>
							<th>Category</th>
							<th>Category</th>
						</tr>
					</thead>
					<tbody>
						{filteredData?.length ? (
							filteredData?.map((user, index) => (
								<tr key={index} className="customBg-blue">
									<td>{user.title}</td>
									<td>
										{user?.discountPercentage > 0 ? (
											<>
												<s>${user.price}</s> $
												{Number(
													(
														user.price *
														(1 -
															user.discountPercentage /
																100)
													).toFixed(2)
												)}
											</>
										) : (
											user.price
										)}
									</td>
									<td>
										<StarRating rating={user?.rating} />
										{Number(user?.rating?.toFixed(1))}
									</td>
									<td>{user.stock}</td>
									<td>{user.category}</td>
									<td>{user.category}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="9" style={{ textAlign: "center" }}>
									There is no data available in the table.
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</div>

			{/* Pagination */}
			<div className="d-flex overflow-auto">
				<Pagination className="mx-auto">
					{Array.from({ length: totalPages }).map((_, index) => (
						<Pagination.Item
							key={index + 1}
							active={index + 1 === currentPage}
							onClick={() => handlePageChange(index + 1)}
						>
							{index + 1}
						</Pagination.Item>
					))}
				</Pagination>
			</div>
		</div>
	)
}

export default Products
