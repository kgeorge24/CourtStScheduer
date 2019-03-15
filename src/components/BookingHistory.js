import React, { Component } from 'react';
import BookingHistoryCard from './BookingHistoryCard'

export default class BookingHistory extends Component {
    render() {
        return(
            <div>
                <div className="booking-history-heading">
                    <h3>Number Of Sessions Booked</h3>
                    <h2>5</h2>
                </div>

                <div className="booking-history-page">
                    <BookingHistoryCard />
                </div>
            </div>
        );
    }
 }