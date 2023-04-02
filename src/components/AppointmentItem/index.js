import './index.css'

const AppointmentItem = props => {
  const {eachDetail, onClickStar} = props
  const {id, isStarred, forrmattedDate, usertext} = eachDetail

  const onCLickStarButton = () => {
    onClickStar(id)
    // console.log(isStarred)
  }
  console.log(isStarred)
  const image = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-item">
      <div className="appoint-card">
        <div className="text-starred-container">
          <p className="card-text">{usertext}</p>
          <button
            className="star-button"
            onClick={onCLickStarButton}
            type="button"
            data-testid="star"
          >
            <img src={image} alt="star" />
          </button>
        </div>
        <p className="scheduled-date">{forrmattedDate}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
