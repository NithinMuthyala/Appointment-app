import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {detailsList: [], usertext: '', userdate: '', isActiveStared: false}

  onClickStar = id => {
    const {detailsLists} = this.state
    // console.log(id)

    this.setState(prevState => ({
      detailsList: prevState.detailsList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isStarred: !eachApp.isStarred}
        }
        return eachApp
      }),
    }))
  }

  starredButton = () => {
    // console.log('stared trigered')
    const {isActiveStared, detailsList} = this.state
    this.setState(prevState => ({isActiveStared: !prevState.isActiveStared}))
  }

  dateInput = event => {
    this.setState({userdate: event.target.value})
  }

  textInput = event => {
    this.setState({usertext: event.target.value})
  }

  submittedDetails = event => {
    event.preventDefault()
    const {userdate, usertext, detailsList} = this.state
    const forrmattedDate = format(new Date(userdate), 'dd MMMM yyyy, EEEE')
    // console.log(forrmattedDate)
    const details = {
      id: v4(),
      isStarred: false,
      forrmattedDate,
      usertext,
    }

    this.setState(prevState => ({
      detailsList: [...prevState.detailsList, details],
      usertext: '',
      userdate: '',
    }))
    // console.log(detailsList)
  }

  filteredAppoinments = () => {
    const {isActiveStared, detailsList} = this.state

    if (isActiveStared) {
      return detailsList.filter(eachItem => eachItem.isStarred === true)
    }
    return detailsList
  }

  appointmentcards = () => {
    const {detailsList} = this.state

    const filteredData = this.filteredAppoinments()

    return filteredData.map(eachDetail => (
      <AppointmentItem
        key={eachDetail.id}
        eachDetail={eachDetail}
        onClickStar={this.onClickStar}
      />
    ))
  }

  render() {
    const {userdate, usertext, isActiveStared} = this.state
    const btnclass = isActiveStared ? 'buttonClass' : 'starred-btn'

    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="card-items">
            <form className="form-container" onSubmit={this.submittedDetails}>
              <div className="text-input-container">
                <label htmlFor="text">TITLE</label>
                <input
                  type="text"
                  value={usertext}
                  id="text"
                  onChange={this.textInput}
                  className="text-input"
                  placeholder="Title"
                />
              </div>
              <div className="text-input-container">
                <label htmlFor="date">DATE</label>
                <input
                  placeholder="dd/mm/yyyy"
                  type="date"
                  id="date"
                  onChange={this.dateInput}
                  className="date-input"
                  value={userdate}
                />
              </div>
              <div className="btn-container">
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </form>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          {/* <hr className="line" /> */}
          <div className="appointment-starred-container">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              onClick={this.starredButton}
              className={btnclass}
            >
              starred
            </button>
          </div>
          <ul className="appointment-container">{this.appointmentcards()}</ul>
        </div>
      </div>
    )
  }
}

export default Appointments
