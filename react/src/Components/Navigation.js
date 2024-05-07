// Navigation.js

import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"

const Navigation = () => {
	const pathname = useLocation().pathname
	return (
		<Navbar expand="lg" bg="dark" variant="dark" className="customBg-black">
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mx-auto">
					<Nav.Link
						as={Link}
						to="/"
						className={`${
							pathname === "/"
								? "customColor-blue"
								: "customColor-yellow"
						}`}
					>
						Home
					</Nav.Link>
					<Nav.Link
						as={Link}
						to="/users"
						className={`${
							pathname.indexOf("users") !== -1
								? "customColor-blue"
								: "customColor-yellow"
						}`}
					>
						Users
					</Nav.Link>
					<Nav.Link
						as={Link}
						to="/products"
						className={`${
							pathname.indexOf("products") !== -1
								? "customColor-blue"
								: "customColor-yellow"
						}`}
					>
						Products
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Navigation
