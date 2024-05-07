import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

const DataContext = createContext()

const DataProvider = ({ children }) => {
	const [dataPathName, setDataPathName] = useState("") // users, products

	const [data, setData] = useState([])

	const [totalFilteredCount, setTotalFilteredCount] = useState()

	const pageSizeOptions = [5, 10, 20, 50]
	const [pageSize, setPageSize] = useState(pageSizeOptions[0])
	let isFilter = false

	const [currentPage, setCurrentPage] = useState(1)

	// Calculate current page items based on pageSize and currentPage
	const skip = (currentPage - 1) * pageSize

	// User filters
	const [eyeColors, setEyeColors] = useState(["All"])
	const [eyeColor, setEyeColor] = useState(eyeColors?.[0])
	const eyeColorFilter =
		eyeColor !== "All"
			? (isFilter = true && "key=eyeColor&value=" + eyeColor)
			: ""

	const [bloodGroups, setBloodGroups] = useState(["All"])
	const [bloodGroup, setBloodGroup] = useState(bloodGroups?.[0])
	const bloodGroupFilter =
		bloodGroup !== "All"
			? (isFilter =
					true &&
					"key=bloodGroup&value=" + bloodGroup.replace(/\+/g, "%2B")) // .replace(/\+/g, "%2B") replaces the + sign with URL-encoded value %2B
			: ""

	const [genders, setGenders] = useState(["All"])
	const [gender, setGender] = useState(genders?.[0])
	const genderFilter =
		gender !== "All"
			? (isFilter = true && "key=gender&value=" + gender)
			: ""

	const [ages, setAges] = useState(["All"])
	const [age, setAge] = useState(ages?.[0])
	const ageFilter =
		age !== "All" ? (isFilter = true && "key=age&value=" + age) : ""

	// professional age filter
	// const [fromAge, setFromAge] = useState("")
	// const [toAge, setToAge] = useState("")
	// const getNumbersBetween = (from, to) => {
	// 	from = parseInt(from)
	// 	to = parseInt(to)

	// 	// Validate input: check if from or to is not a valid number after parsing
	// 	if (isNaN(from) || isNaN(to)) {
	// 		console.log("Please provide valid numbers for from and to.")
	// 		return []
	// 	}

	// 	// Initialize an empty array to store the result
	// 	let numbers = []

	// 	// Determine the smaller and larger values for the loop
	// 	const smaller = Math.min(from, to)
	// 	const larger = Math.max(from, to)

	// 	// Loop through the range from smaller to larger (inclusive)
	// 	for (let i = smaller; i <= larger; i++) {
	// 		numbers.push(i) // Add current number to the array
	// 	}

	// 	return numbers // Return the array of numbers between from and to
	// }

	const [categories, setCategories] = useState(["All"])
	const [category, setCategory] = useState(categories?.[0])

	const filter =
		dataPathName === "users"
			? isFilter
				? "/filter/"
				: ""
			: category?.length && category !== "All"
			? "/category/"
			: ""

	useEffect(() => {
		if (dataPathName?.length) {
			// professional age filter
			// if (fromAge?.length && toAge?.length) {
			// 	const ages = getNumbersBetween(fromAge, toAge)
			// 	const fetchData = async () => {
			// 		if (ages.length > 0) {
			// 			try {
			// 				const requests = ages.map((age) =>
			// 					axios.get(
			// 						`https://dummyjson.com/users/filter?key=age&value=${age}`
			// 					)
			// 				)

			// 				const responses = await Promise.all(requests)

			// 				// Process responses to accumulate filtered users
			// 				const allFilteredUsers = responses.reduce(
			// 					(acc, response) => {
			// 						const users = response.data[dataPathName] || []
			// 						return [...acc, ...users]
			// 					},
			// 					[]
			// 				)

			// 				// Use Set to remove duplicates by user id
			// 				const uniqueFilteredUsers = Array.from(
			// 					new Set(allFilteredUsers.map((user) => user.id))
			// 				).map((id) =>
			// 					allFilteredUsers.find((user) => user.id === id)
			// 				)

			// 				setData(uniqueFilteredUsers)
			// 			} catch (error) {
			// 				console.error(
			// 					"Error fetching filtered users:",
			// 					error
			// 				)
			// 			}
			// 		}
			// 	}

			// 	fetchData()
			// }
			const url =
				"https://dummyjson.com/" +
				dataPathName +
				filter +
				(dataPathName === "users"
					? "?" +
					  eyeColorFilter +
					  bloodGroupFilter +
					  ageFilter +
					  genderFilter
					: category !== "All"
					? category + "?"
					: "?") +
				`&limit=${pageSize}&skip=${skip}`
			axios.get(url).then((response) => {
				setTotalFilteredCount(response.data.total)
				setData(response.data[dataPathName])
			})
		}
	}, [
		category,
		pageSize,
		skip,
		dataPathName,
		// professional age filter
		// fromAge,
		// toAge,
		bloodGroupFilter,
		eyeColorFilter,
		filter,
		genderFilter,
		ageFilter,
	])

	useEffect(() => {
		if (dataPathName === "users") {
			axios
				.get(
					"https://dummyjson.com/users?select=eyeColor,bloodGroup,gender,age&limit=100"
				)
				.then((response) => {
					// Extract all eye colors from the data
					const allColors = response.data[dataPathName].map(
						(user) => user.eyeColor
					)
					// Get unique eye colors using Set
					const uniqueColors = [...new Set(allColors)]
					// Update state with unique eye colors
					setEyeColors((eyeColors) => [...eyeColors, ...uniqueColors])

					// Extract all blood groups from the data
					const allBloodGroups = response.data[dataPathName].map(
						(user) => user.bloodGroup
					)
					// Get unique blood groups using Set
					const uniqueBloodGroups = [...new Set(allBloodGroups)]
					// Update state with unique blood groups
					setBloodGroups((bloodGroups) => [
						...bloodGroups,
						...uniqueBloodGroups,
					])

					// Extract all genders from the data
					const allGenders = response.data[dataPathName].map(
						(user) => user.gender
					)
					// Get unique genders using Set
					const uniqueGenders = [...new Set(allGenders)]
					// Update state with unique genders
					setGenders((genders) => [...genders, ...uniqueGenders])

					// Extract all ages from the data
					const allAges = response.data[dataPathName].map(
						(user) => user.age
					)
					// Get unique ages using Set
					const uniqueAges = [...new Set(allAges)]
					// Update state with unique ages
					setAges((ages) => [...ages, ...uniqueAges.sort()])
				})
				.catch((e) => console.log(e))
		} else if (dataPathName === "products") {
			axios
				.get("https://dummyjson.com/products/categories")
				.then((response) => {
					setCategories(["All", ...response?.data])
				})
				.catch((e) => console.log(e))
		}
	}, [dataPathName])

	return (
		<DataContext.Provider
			value={{
				data,
				setData,
				setDataPathName,
				eyeColors,
				pageSizeOptions,
				pageSize,
				currentPage,
				setCurrentPage,
				setPageSize,
				eyeColor,
				setEyeColor,
				bloodGroups,
				bloodGroup,
				setBloodGroup,
				genders,
				gender,
				setGender,
				// professional age filter
				// fromAge,
				// setFromAge,
				// toAge,
				// setToAge,
				ages,
				age,
				setAge,
				categories,
				category,
				setCategory,
				totalFilteredCount,
			}}
		>
			{children}
		</DataContext.Provider>
	)
}

export { DataContext, DataProvider }
