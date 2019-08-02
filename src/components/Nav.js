import React, { Component } from "react"
// import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom"
import "../css/Nav.css"
import { slide as Menu } from "react-burger-menu"

class Nav extends Component {
	state = {
		clickedHamburger: false,
		clickedCities: false
	}

	logoutHandler = () => {
		localStorage.clear()
		this.props.history.push("/")
	}

	clickHandler = () => {
		this.state.clickedHamburger === false
			? this.setState({ clickedHamburger: true })
			: this.setState({ clickedHamburger: false })
	}

	showBurgerMenu = () => {
		if (this.state.clickedHamburger === true) {
			return (
				<div className="burger-menu">
					<div className="header">
						<h5>Menu</h5>
					</div>
					<div className="links">
						<h3>
							<a href="home">HOME</a>
						</h3>
						<h3>
							<a href="home">ABOUT</a>
						</h3>
						<h3>
							<a href="home">CONTACT</a>
						</h3>
					</div>
				</div>
			)
		} else {
			return (
				<div className="burger-menu-hidden">
					<div className="header">
						<h5>Menu</h5>
					</div>
					<div className="links">
						<h3>
							<a href="home">CALENDAR</a>
						</h3>
						<h3>
							<a href="home">BOOKING HISTORY</a>
						</h3>
						<h3>
							<a href="home">REPORT AN ISSUE</a>
						</h3>
						<h3>
							<a href="home">LOGOUT</a>
						</h3>
					</div>
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				<img
					src={require("../img/burger.png")}
					alt=""
					onClick={this.clickHandler}
				/>

				{this.showBurgerMenu()}
			</div>
		)
	}
}

export default withRouter(Nav)
