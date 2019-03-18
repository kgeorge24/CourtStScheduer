import React, { Component } from "react";

export default class BookingHistoryCard extends Component {
    render() {
        return(
            <div className="booking-history-card">
                <div className='action-button'>

                </div>

                <div className='date-section'>
                    <h2>22</h2>
                    <br></br>
                    <p>Jan</p>
                </div>

                <div className='time-section'>
                    <p>1pm - 3pm<span className='red'>(2hrs)</span></p>
                </div>

                <div className='status-section'>
                    <p>Completed</p>
                </div>

            </div>
        );
    }
}