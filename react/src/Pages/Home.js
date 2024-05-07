import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom" // Assuming you are using React Router for navigation

const Home = () => {
	return (
		<Container className="mt-5">
			<Row className="justify-content-center">
				<Col md={8}>
					<h1>Welcome to Our Website</h1>
					<p>
						To view users, click the button below:
						<br />
						<Link to="/users">
							<Button variant="primary" className="me-3">
								View Users
							</Button>
						</Link>
					</p>
					<p>
						To view products, click the button below:
						<br />
						<Link to="/products">
							<Button variant="success">View Products</Button>
						</Link>
					</p>
				</Col>
			</Row>
		</Container>
	)
}

export default Home
