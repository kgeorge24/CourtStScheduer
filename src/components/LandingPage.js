import React, { Component } from "react"
import { Link } from "react-router-dom"
import "../css/LandingPage.css"

export default class LandingPage extends Component {
	whichPage = () => {
		let token = localStorage.getItem("token")

		return token ? "/calendar" : "/login"
	}

	render() {
		return (
			<div className="landing-background">
				<header>
					<h1 className="landingPage-heading">Court St. Scheduler</h1>
				</header>
				<div className="button-container">
					<Link to={{ pathname: this.whichPage() }}>
						<button className="landing-button">Get Started</button>
					</Link>
				</div>
			</div>
		)
	}
}
