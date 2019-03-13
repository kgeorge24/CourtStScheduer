import React, { Component } from 'react';

export default class Register extends Component {
    state = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",

    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log(this.state))
    }

    render() {
        return(
            <div className="form-container">

            <div className="form">                
                <h1 id="form-h1">Register</h1>
                <form onSubmit={ (e) => this.props.submitHandler(e, this.state)}>
                    <input type="text" name="firstName" 
                    value={this.state.firstName} 
                    className="form-input" 
                    placeholder="First Name" onChange={this.changeHandler}/>

                    <input type="text" name="lastName" 
                    value={this.state.lastName} 
                    className="form-input" 
                    placeholder="Last Name" onChange={this.changeHandler}/>

                    <input type="text" name="phoneNumber" 
                    value={this.state.phoneNumber} 
                    className="form-input" 
                    placeholder="Phone Number" onChange={this.changeHandler}/>
                    
                    <input type="text" name="email" 
                    value={this.state.email} 
                    className="form-input" 
                    placeholder="Email" onChange={this.changeHandler}/>

                    <input type="password" name="password" 
                    value={this.state.password} 
                    className="form-input" 
                    placeholder="Password" onChange={this.changeHandler}/>

                    <br></br>

                    <button className="calendar-button">Register</button>
                </form>
            </div>
            </div>
        );
    }
}