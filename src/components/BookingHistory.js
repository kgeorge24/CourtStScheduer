import React, { Component } from 'react';
import BookingHistoryCard from './BookingHistoryCard'

export default class BookingHistory extends Component {
    state = {
        pastBookings: []
    }

    componentDidMount = () => {
        let token = localStorage.getItem('token')

        fetch('http://localhost:3000/booking', {
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                Authorization: token
            }
        }).then( res => res.json())
        .then( json => {
            console.log(json, this.props.user )

            let usersBookings = json.filter( booking => {
                return parseInt(booking.user_id) === parseInt(this.props.user.id)
            })

            this.setState({pastBookings: usersBookings})
        })
    }


    loadBookingHistoryCards = () => {
        console.log(this.state.pastBookings)
        let bookings = this.state.pastBookings.map( booking => {
            return <BookingHistoryCard key={booking.id}/>
        })

        return bookings
    }

    render() {

        const bookings = this.state.pastBookings.map( booking => {
            return <BookingHistoryCard key={booking.id}/>
        })
        return(
            <div>
                <div className="booking-history-heading">
                    <h3>Number Of Sessions Booked</h3>
                    <h2>{this.state.pastBookings.length}</h2>
                </div>

                <div className="booking-history-page">
                    {this.loadBookingHistoryCards()}
                </div>
            </div>
        );
    }
 }