import React, { Component } from 'react';
import './App.css';
import Booking from './components/Booking';
import { Route, Switch } from "react-router-dom";
import Schedule from './components/Schedule';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import { withRouter } from 'react-router-dom'


class App extends Component {
  state = {
    user: {},
    errorMessage: ""
  }

  componentDidMount = () => {
    let token = localStorage.getItem('token')

    if(token){
      console.log('token is here')
      // Must add fetch here for current user.
      fetch('http://localhost:3000/current_user', {
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json',
          Authorization: token
        }
      })
      .then( res => res.json())
      .then(json => this.setState({ user: json}))
    }else{
      console.log('no token')
      this.props.history.push('/')
    }
  }

  submitHandler = (e, formInfo) => {
    e.preventDefault()

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json'
        },
        body: JSON.stringify({
            first_name: formInfo.firstName,
            last_name: formInfo.lastName,
            phone_number: formInfo.phoneNumber,
            email: formInfo.email,
            password: formInfo.password
        })
    })
    .then( res => res.json())
    .then( person => {
      if(person.jwt){
        localStorage.setItem('token', person.jwt)
        this.setState({
          user: person
        }, () => {
        this.props.history.push('/calendar')
        })
      }
    })
}

  loginHandler = (e, formInfo) => {
    e.preventDefault()
    console.log('im reaching')

    fetch('http://localhost:3000/login', {
        method: 'POST', 
        headers: { 
          'Content-type': 'application/json',
          'Accepts': "application/json"
      }, 
      body: JSON.stringify({
        email: formInfo.email,
        password: formInfo.password
      })
    })
    .then( res => res.json())
    .then( json => {
      if(json.jwt){
        localStorage.setItem('token', json.jwt)
        this.setState({ user: json})
        this.props.history.push('/calendar')
      }else if(json.error){
        this.setState({ errorMessage: json.error })
      }
    })
  }

  render() {
    return (
       <div className="App">
       <Switch>
         <Route exact path="/" component={LandingPage} />
         <Route path="/login" render={() => (<Login loginHandler={this.loginHandler} error={this.state.errorMessage}/>)}/>
         <Route path="/register" render={() => (<Register submitHandler={this.submitHandler}/>)}/>
         <Route path="/calendar" render={() => (<Schedule user={this.state.user}/>)} />
         <Route path="/booking" component={Booking}/>
       </Switch>
       </div>
    );
  }
}

export default withRouter(App);
