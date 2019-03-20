import React, { Component } from "react";

export default class BookingHistoryCard extends Component {
    render() {
        let date = this.props.booking.date.split(' ')
        let time = this.props.booking.time.split(' ')
        return(
            <div className="booking-history-card">
                <div className='action-button'>

                </div>

                <div className='date-section'>
                    <h2>{date[2]}</h2>
                    <br></br>
                    <p>{date[1]}</p>
                </div>

                <div className='time-section'>
                    <p>{time[0]} - {time[2]}</p>
                </div>

                <div className='status-section'>
                    <p>Completed</p>
                </div>

            </div>
        );
    }
}