import React, { Component } from 'react';
import Calendar from 'react-calendar';
import Form from './Form'
import Nav from './Nav'

export default class Schedule extends Component {
    state = {
        day: "",
        clicked: false
    }
    
    
    dayClicked = (value) => {
        let date = value.toString()
        date = date.split(" ")
        let clickDate =  date[0] + " " + date[1] + " " + date[2]
        // console.log(clickDate)
        this.setState({ 
            day: clickDate,
            clicked: true
        })
    }
    
    showForm() {
        return (this.state.clicked === true ? <Form day={this.state.day} user={this.props.user} /> : null)
    }

    showCalendarIfLoggedIn() {
        let token = localStorage.getItem('token')
        
        if(token){
            return <div>
                <br></br>
                <br></br>
                <br></br>
                <h1 class="h1">Court St Schedule</h1>
            <div className="calendar">
                <Calendar className="styleCal" onClickDay={this.dayClicked}/>   
                {this.showForm()}
            </div>
        </div>
        }else{
            return <div>
                <h1>Please Login Or Register.</h1>
            </div>
        }
    }
    
    render(){
        return(
            <div>
                {this.showCalendarIfLoggedIn()}
            </div>
        )
    }
}