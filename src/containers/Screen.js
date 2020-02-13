import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestDataAction, updateEventIndexAction } from '../actions/screenAction'
import Member from '../components/Member'
import Loader from '../components/Loader'
import './Screen.css'

class Screen extends Component {

  componentDidMount() {
    this.props.requestDataAction()
    setInterval(() =>
      this.props.requestDataAction(),
      8000
    )
    setInterval(() =>
      this.props.updateEventIndexAction(),
      15000
    )
  }

  render() {
    const { events, eventIndex, defaultUserImgUrl } = this.props
    if (events.length) {
      const event = events[eventIndex]
      return (
        <div className="row">
          <div className="col-10 card">
            <img src={event.img_url} />
          </div>
          <div className="col member-section">
            <div className="row justify-content-center">
              <h2>Who's Going</h2>
            </div>
            {event.members.map((member, i) =>
              <Member member={member} defaultUserImgUrl={defaultUserImgUrl} key={i} />
            )}
          </div>
        </div>
      )
    }
    return (
      <Loader />
    )
  }
}

const mapStateToProps = state => ({
  events: state.screen.events,
  eventIndex: state.screen.eventIndex,
  defaultUserImgUrl: 'https://image.flaticon.com/icons/svg/149/149071.svg'
})

const mapDispatchToProps = dispatch => ({
 requestDataAction: () => dispatch(requestDataAction()),
 updateEventIndexAction: () => dispatch(updateEventIndexAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
