import React, { useContext, useEffect, useState } from "react"
import { Breadcrumb, Dropdown, Form, Pagination, Table } from "react-bootstrap"
import { DataContext } from "../Components/DataContext"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faSpinner, faX } from "@fortawesome/free-solid-svg-icons"

const Users = () => {
	const {
		data,
		setData,
		setDataPathName,
		pageSizeOptions,
		pageSize,
		setPageSize,
		currentPage,
		setCurrentPage,
		eyeColors,
		eyeColor,
		setEyeColor,
		bloodGroups,
		bloodGroup,
		setBloodGroup,
		genders,
		gender,
		setGender,
		// professional age filter
		// setFromAge,
		// setToAge,
		// fromAge,
		// toAge,
		ages,
		age,
		setAge,
		totalFilteredCount,
	} = useContext(DataContext)

	useEffect(() => {
		setDataPathName("users")
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const [showSearchInput, setShowSearchInput] = useState(false)

	// professional age filter
	// const [showAgeFilter, setShowAgeFilter] = useState(false)

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

	// professional age filter
	// const handleAgeFilterClick = () => {
	// 	setShowAgeFilter((showAgeFilter) => !showAgeFilter)
	// 	setFromAge(undefined)
	// 	setToAge(undefined)
	// }

	const resetFilterChange = (filterType, value) => {
		if (value !== "All") setData()
		// Reset all filters based on the filterType being changed
		switch (filterType) {
			case "eyeColor":
				setBloodGroup(bloodGroups?.[0])
				setGender(genders?.[0])
				setAge(ages?.[0])
				break
			case "bloodGroup":
				setEyeColor(eyeColors?.[0])
				setGender(genders?.[0])
				setAge(ages?.[0])
				break
			case "gender":
				setEyeColor(eyeColors?.[0])
				setBloodGroup(bloodGroups?.[0])
				setAge(ages?.[0])
				break
			case "age":
				setEyeColor(eyeColors?.[0])
				setBloodGroup(bloodGroups?.[0])
				setGender(genders?.[0])
				break
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

	const handleEyeColorChange = (color) => {
		setEyeColor(color)
		resetFilterChange("eyeColor", eyeColor)
	}

	const handleBloodGroupChange = (bloodGroup) => {
		setBloodGroup(bloodGroup)
		resetFilterChange("bloodGroup", bloodGroup)
	}

	const handleGenderChange = (gender) => {
		setGender(gender)
		resetFilterChange("gender", gender)
	}

	const handleAgeChange = (age) => {
		setAge(age)
		resetFilterChange("age", age)
	}

	const handleSearchInputChange = (e) => {
		setSearchTerm(e.target.value)
		// setCurrentPage(1) // Reset to first page when changing search term
	}

	// Filter users based on comprehensive search term

	// Calculate total number of pages based on pageSize and total filtered users count
	const totalPages = Math.ceil(totalFilteredCount / pageSize)

	const handlePageChange = (page) => {
		if (page !== currentPage) setData()
		setCurrentPage(page)
	}

	const [ageSearchQuery, setAgeSearchQuery] = useState("")
	// Filter ages based on search query
	const filteredAges = ages.filter((age) =>
		age.toString().toLowerCase().includes(ageSearchQuery.toLowerCase())
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
					Users
				</Breadcrumb.Item>
			</Breadcrumb>

			{/* Filter Section */}
			<div className="d-md-flex align-items-center justify-content-evenly text-center mb-3">
				<Form.Group className="filter-dropdown my-2">
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

				<div className="search-container my-2">
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
						className="px-2 cursor-pointer mx-auto"
						onClick={handleSearchIconClick}
					/>
				</div>

				<Form.Group className="filter-dropdown my-2">
					<Dropdown>
						<Dropdown.Toggle
							disabled={
								!filteredAges.filter((_) => _ !== "All").length
							}
							variant="primary"
							className="customBg-black customColor-yellow"
							id="dropdown-category"
						>
							Age: {age}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{/* Search input */}
							<Form.Control
								type="number"
								placeholder="Search ages..."
								value={ageSearchQuery}
								onChange={(e) =>
									setAgeSearchQuery(e.target.value)
								}
								style={{ marginBottom: "8px" }}
							/>

							{/* Display filtered age options */}
							{filteredAges.map((age, i) => (
								<Dropdown.Item
									key={i}
									onClick={() => handleAgeChange(age)}
								>
									{age}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
				</Form.Group>

				<Form.Group className="filter-dropdown my-2">
					<Dropdown>
						<Dropdown.Toggle
							disabled={
								// Ensure that the eye colors are loaded from the API, excluding the default option, which is 'ALL'.
								!genders.filter((_) => _ !== "All").length
							}
							variant="primary"
							className="customBg-black customColor-yellow"
							id="dropdown-category"
						>
							Gender: {gender}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{genders?.map((gender, i) => (
								<Dropdown.Item
									key={i}
									onClick={() => handleGenderChange(gender)}
								>
									{gender?.charAt(0).toUpperCase() +
										gender?.slice(1)}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
				</Form.Group>

				<Form.Group className="filter-dropdown my-2">
					<Dropdown>
						<Dropdown.Toggle
							disabled={
								// Ensure that the eye colors are loaded from the API, excluding the default option, which is 'ALL'.
								!bloodGroups.filter((_) => _ !== "All").length
							}
							variant="primary"
							className="customBg-black customColor-yellow"
							id="dropdown-category"
						>
							Blood Group: {bloodGroup}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{bloodGroups?.map((bloodGroup, i) => (
								<Dropdown.Item
									key={i}
									onClick={() =>
										handleBloodGroupChange(bloodGroup)
									}
								>
									{bloodGroup}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
				</Form.Group>

				<Form.Group className="filter-dropdown my-2">
					<Dropdown>
						<Dropdown.Toggle
							disabled={
								// Ensure that the eye colors are loaded from the API, excluding the default option, which is 'ALL'.
								!eyeColors.filter((_) => _ !== "All").length
							}
							variant="primary"
							className="customBg-black customColor-yellow"
							id="dropdown-category"
						>
							Eye color: {eyeColor}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{eyeColors?.map((color, i) => (
								<Dropdown.Item
									key={i}
									onClick={() => handleEyeColorChange(color)}
								>
									{color}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
				</Form.Group>

				{/* professional age filter */}
				{/* <Row>
					{showAgeFilter ? (
						<>
							<Col className="px-1">
								<Form.Control
									type="number"
									value={fromAge}
									placeholder="From Age"
									onChange={(e) => setFromAge(e.target.value)}
								/>
							</Col>
							<Col className="px-1">
								<Form.Control
									type="number"
									value={toAge}
									placeholder="To Age"
									onChange={(e) => setToAge(e.target.value)}
								/>
							</Col>
						</>
					) : (
						<></>
					)}
					<Col className="px-1">
						<Button
							variant="primary"
							className="customBg-black customColor-yellow"
							onClick={handleAgeFilterClick}
							type="submit"
						>
							{showAgeFilter ? (
								<FontAwesomeIcon icon={faX} className="mx-2" />
							) : (
								"Age Filter"
							)}
						</Button>
					</Col>
				</Row> */}
			</div>

			{/* Table */}
			<div className="table-responsive">
				<Table striped bordered hover responsive>
					<thead>
						<tr className="customBg-grey">
							<th>Firstname</th>
							<th>Lastname</th>
							<th>Middlename</th>
							<th>Age</th>
							<th>Gender</th>
							<th>Email</th>
							<th>Username</th>
							<th>Bloodgroup</th>
							<th>Eyecolor</th>
						</tr>
					</thead>
					<tbody>
						{filteredData?.length ? (
							filteredData?.map((user, index) => (
								<tr key={index} className="customBg-blue">
									<td>{user.firstName}</td>
									<td>{user.lastName}</td>
									<td>{user.maidenName}</td>
									<td>{user.age}</td>
									<td>{user.gender}</td>
									<td>{user.email}</td>
									<td>{user.username}</td>
									<td>{user.bloodGroup}</td>
									<td>{user.eyeColor}</td>
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

export default Users
