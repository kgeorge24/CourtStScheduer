import React, { Component } from "react";

export default class BookingHistoryCard extends Component {
    render() {
        return(
            <div className="booking-history-card">
                <div className='action-button'>

                </div>

                <div className='date-section'>
                <p>Thursday Jan 22 2019 1pm - 3pm</p>
                </div>

                <div className='status-section'>
                <p>Completed</p>
                </div>
            </div>
        );
    }
}