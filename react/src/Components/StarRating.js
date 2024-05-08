import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons"

const StarRating = ({ rating }) => {
	// Calculate full stars
	const fullStars = Math.floor(rating)
	// Check if there's a half star
	const hasHalfStar = rating - fullStars >= 0.5

	// Array to store star elements
	const stars = []

	// Add full stars
	for (let i = 0; i < fullStars; i++) {
		stars.push(<FontAwesomeIcon icon={faStar} key={i} />)
	}

	// Add half star if necessary
	if (hasHalfStar) {
		stars.push(<FontAwesomeIcon icon={faStarHalf} key="half-star" />)
	}

	// Add empty stars to make up 5 stars
	while (stars.length < 5) {
		stars.push(
			<FontAwesomeIcon
				icon={faStar}
				key={`empty-star-${stars.length}`}
				className="empty-star"
			/>
		)
	}
 return <></>
	return (
		<div className="star-rating">
			{stars.map((star, index) => (
				<span key={index}>{star}</span>
			))}
		</div>
	)
}

export default StarRating
