import React, { Component } from 'react';
import BookingHistoryCard from './BookingHistoryCard'

export default class BookingHistory extends Component {



    loadBookingHistoryCards = () => {
        console.log(this.props.pastBookings)

        let bookings = this.props.pastBookings.map( booking => {
            console.log('this is the booking', booking)
            return <BookingHistoryCard key={booking.id} booking={booking}/>
        })

        console.log('all the bookings', bookings)
        return bookings
    }

    render() {
        console.log('past Bookings:', this.props.pastBookings)
        return(
            <div>
                <div className="booking-history-heading">
                    <h3>Number Of Sessions Booked</h3>
                    <h2>{this.props.pastBookings.length}</h2>
                </div>

                <div className="booking-history-page">
                    {this.loadBookingHistoryCards()}
                </div>
            </div>
        );
    }
 }