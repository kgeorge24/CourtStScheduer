import React, { Component } from 'react'
import BookingHistoryCard from './BookingHistoryCard'
import '../css/BookingHistory.css'

export default class BookingHistory extends Component {
  loadBookingHistoryCards = () => {
    let bookings = this.props.pastBookings.map(booking => {
      return <BookingHistoryCard key={booking.id} booking={booking} />
    })
    return bookings
  }

  render() {
    return (
      <div>
        <div className="booking-history-heading">
          <h3>Number Of Sessions Booked</h3>
          <h2>{this.props.pastBookings.length}</h2>
        </div>

        <div className="booking-history-page">
          {this.loadBookingHistoryCards()}
        </div>
      </div>
    )
  }
}
