import React from "react"
import { Route, Routes } from "react-router-dom"
import Navigation from "./Components/Navigation"
import Users from "./Pages/Users"
import Products from "./Pages/Products"
import Home from "./Pages/Home"

const App = () => {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path={"/"} element={<Home />} />
				<Route path={"/users"} element={<Users />} />
				<Route path={"/products"} element={<Products />} />
			</Routes>
		</>
	)
}

export default App
