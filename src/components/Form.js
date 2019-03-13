import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Form extends Component {

    render(){
        return(
            <div className="calendar-form">
                <h3>You've selected {this.props.day}<br></br>
                Is that correct?</h3>
                <br></br>
                <div className="calendar-button-div">
                    
                    
                    <Link to={{pathname: '/booking',
                        state: { day: this.props.day, user: this.props.user }}}><button className="calendar-button">Yes Book Now</button>
                    </Link>
                </div>
            </div>
        )
    }
}