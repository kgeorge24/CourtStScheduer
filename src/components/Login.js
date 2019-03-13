import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    state = {
        email: "",
        password: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value}, () => console.log(this.state))
    } 

    displayError = () => {
        return (this.props.error === "" ? null : this.props.error)
        }
    

    render() {
        console.log(this.displayError())
        return(
            <div className="form-container">
            <div className="form">
                <h1 id="form-h1">Login</h1>
                <p id="error-message">{this.displayError()}</p>
                <form onSubmit={(e) => this.props.loginHandler(e, this.state)}>
                    <input type="text" name="email" 
                    value={this.state.email} 
                    className="form-input" 
                    placeholder="Email" 
                    onChange={this.changeHandler}/>

                    <br></br>

                    <input type="password" name="password" 
                    value={this.state.password} 
                    className="form-input" 
                    placeholder="Password" 
                    onChange={this.changeHandler}/>

                    <br></br>

                    <button className="calendar-button">Login</button>   
                    <br></br>
                    <Link to={{pathname: '/register'}}>Dont have an account?</Link>
                </form>
            </div>

            </div>
        );
    }
    }
