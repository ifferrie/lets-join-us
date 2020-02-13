import React from 'react'

const Member = ({ member, defaultUserImgUrl }) => {
  return (
    <div className="member-list">
      <div className="row justify-content-center">
        <img src={member['Image URL']? member['Image URL'] : defaultUserImgUrl} className="member" />
      </div>
      <div className=" row justify-content-center">
        <h6>{`${member['Display Name'] || 'unknown'}, ${member['Job Title'] || 'unknown'}`}</h6>
      </div>
    </div>
  )
}

export default Member
