import React, { Component } from 'react'

export default class Booking extends Component {
  state = {
    start: '9am',
    finish: '',
    dateData: {},
    bookingTimesToRemove: [],
    clicked: false,
    hoursBooked: 0,
    show: false,
    overLappingTime: false
  }

  componentDidMount = () => {
    let token = localStorage.getItem('token')

    fetch('http://localhost:3000/day', {
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(json => {
        // Checks to see if there is any days booked and if there is
        // we grab the current day the person is trying to book.
        if (json.toString() !== '') {
          let sameDay = json.filter(time => {
            return time.date === this.props.location.state.day
          })

          // If there is a match to the current selected date.
          if (sameDay.toString() !== '') {
            let dayId = sameDay[0].id
            console.log(dayId)

            fetch(`http://localhost:3000/booking_time`, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
              }
            })
              .then(res => res.json())
              .then(json => {
                let justTheTimes = []

                json.forEach(time => {
                  if (time.day_id === dayId) {
                    justTheTimes.push(time.name)
                  }
                })

                this.setState({ bookingTimesToRemove: justTheTimes })
              })
          }
        }
      })
  }

  // User No Longer Wants to Book This Date. Gets Sent Back To Calendar.
  userPressedXButton = () => {
    this.props.history.push('/calendar')
  }

  // When User Submits Booking And Is Satisfied With The Date.
  submitHandler = e => {
    e.preventDefault()

    let token = localStorage.getItem('token')

    fetch('http://localhost:3000/day', {
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(days => {
        let actualDatesArray = []

        days.forEach(day => {
          actualDatesArray.push(day.date)
        })

        if (actualDatesArray.includes(this.props.location.state.day)) {
          console.log(
            'day does exist so we get the object and then create boking times'
          )

          fetch('http://localhost:3000/day', {
            headers: {
              'Content-Type': 'application/json',
              Accepts: 'application/json',
              Authorization: token
            }
          })
            .then(res => res.json())
            .then(json => {
              let dayObject = json.filter(day => {
                return day.date === this.props.location.state.day
              })
              this.createBookingTimes(dayObject[0])
            })
        } else {
          console.log('day doesnt exist so we created it')
          this.createDay()
        }
      })
  }

  createUserBooking = () => {
    let token = localStorage.getItem('token')
    let bookingTime = this.state.start + ' to ' + this.state.finish

    fetch('http://localhost:3000/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        user_id: this.props.location.state.user.id,
        date: this.props.location.state.day,
        time: bookingTime
      })
    })
      .then(res => res.json())
      .then(() => console.log)
  }

  createDay = () => {
    let token = localStorage.getItem('token')

    fetch('http://localhost:3000/day', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        date: this.props.location.state.day
      })
    })
      .then(res => res.json())
      .then(json => this.createBookingTimes(json))
  }

  createBookingTimes = json => {
    let times = [
      '9am',
      '10am',
      '11am',
      '12pm',
      '1pm',
      '2pm',
      '3pm',
      '4pm',
      '5pm',
      '6pm',
      '7pm',
      '8pm',
      '9pm',
      '10pm',
      '11pm',
      '12am',
      '1am'
    ]

    let { start, finish } = this.state
    let timeRange = []

    times.forEach((time, index) => {
      if (time === start) {
        timeRange.push(index)
      }

      if (time === finish) {
        timeRange.push(index)
      }
    })

    let allTimes = times.slice(timeRange[0], timeRange[1] + 1)

    if (allTimes.length < 3) {
    } else if (allTimes.length >= 3) {
      let cantBook = false

      allTimes.forEach(time => {
        if (this.state.bookingTimesToRemove.includes(time)) {
          cantBook = true
        }
      })

      if (cantBook === false) {
        this.saveBookingTimeToBackend(allTimes, json)
        this.createUserBooking()
        this.setState({ show: true })

        setTimeout(this.pushToCalendar, 5000)
      } else {
        this.setState({ overLappingTime: true })
      }
    }
  }

  pushToCalendar = () => {
    this.props.history.push('/calendar')
  }

  saveBookingTimeToBackend = (allTimes, json) => {
    let token = localStorage.getItem('token')

    allTimes.forEach(time => {
      fetch('http://localhost:3000/booking_time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          available: false,
          name: time,
          day_id: json.id
        })
      })
        .then(res => res.json())
        .then(json => console.log)
    })
  }

  availableBookingTimes = () => {
    let times = [
      '9am',
      '10am',
      '11am',
      '12pm',
      '1pm',
      '2pm',
      '3pm',
      '4pm',
      '5pm',
      '6pm',
      '7pm',
      '8pm',
      '9pm',
      '10pm',
      '11pm',
      '12am',
      '1am'
    ]

    let options = []
    let { bookingTimesToRemove } = this.state

    // If there are booking times for this date we remove them
    // from the available booking times and display whats left.
    if (bookingTimesToRemove) {
      let dynamicTimes = times.filter(time => {
        return !bookingTimesToRemove.includes(time)
      })

      dynamicTimes.forEach(time => {
        options.push(
          <option key={time} name="time" value={time}>
            {time}
          </option>
        )
      })

      return options
    } else {
      times.forEach(time => {
        options.push(
          <option key={time} name="time" value={time}>
            {time}
          </option>
        )
      })
      return options
    }
  }

  // saves time selected for booking times in state.
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value }, () =>
      this.calculateDeposit()
    )
  }

  calculateDeposit = () => {
    let times = [
      '9am',
      '10am',
      '11am',
      '12pm',
      '1pm',
      '2pm',
      '3pm',
      '4pm',
      '5pm',
      '6pm',
      '7pm',
      '8pm',
      '9pm',
      '10pm',
      '11pm',
      '12am',
      '1am'
    ]

    let { start, finish } = this.state
    let timeRange = []

    times.forEach((time, index) => {
      if (time === start) {
        timeRange.push(index)
      }

      if (time === finish) {
        timeRange.push(index)
      }
    })

    let allTimes = times.slice(timeRange[0], timeRange[1] + 1)

    this.setState({ hoursBooked: allTimes.length - 1 })
  }

  clickedBook = () => {
    this.setState({ clicked: true })
  }

  showBookingStatus = () => {
    if (this.state.show === true) {
      return (
        <div className="booking-confirm">
          <p>
            You will recieve a text message when Court responds to your request.
          </p>
        </div>
      )
    }

    if (this.state.overLappingTime === true) {
      return (
        <div className="booking-confirm">
          <p>
            This session is overlaps another. Please choose a different time.
          </p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="form-container">
        <div className="booking-form">
          <button className="x-button" onClick={this.userPressedXButton}>
            x
          </button>
          <div className="heading">
            <h1>Booking for {this.props.location.state.day}</h1>
          </div>
          <form onSubmit={this.submitHandler}>
            <div className="time-frame">
              From: &nbsp;
              <select name="start" onChange={this.changeHandler}>
                {this.availableBookingTimes()}
              </select>
              &nbsp; &nbsp; &nbsp; To: &nbsp;
              <select name="finish" onChange={this.changeHandler}>
                {this.availableBookingTimes()}
              </select>
            </div>
            <div className="booking-button-area">
              <p>
                A Deposit of{' '}
                <span id="red">${this.state.hoursBooked * 20}</span> is{' '}
                <span id="red">Required</span>
              </p>
              <button className="calendar-button" onClick={this.clickedBook}>
                Book
              </button>
            </div>
          </form>
        </div>
        {this.showBookingStatus()}
      </div>
    )
  }
}
