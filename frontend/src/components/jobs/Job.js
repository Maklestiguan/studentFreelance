import React,  { useMemo } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';
import PropTypes from 'prop-types';
import '../common/commonStyles.css';
import './checkout.css';

const Job = props => {
  const { id, summary, technologies_display, user, timestamp } = props.job;
  const date = useMemo(() => new Date(timestamp.toLocaleString()).toDateString(), [timestamp]);

  return (
    <MDBCard>
      <MDBCardBody className="position-relative">
        <div className="flex-item-equal-half-no-center">
          <span className="text-our-advantages">Автор: {user}</span>
          <MDBCardTitle>{summary} || {technologies_display}</MDBCardTitle>
          <span
            className="position-absolute text-muted"
            style={{ top: "25px", right: "28px" }}
          >
            {date}
          </span>
        </div>
        <div className="flex-item-equal-half-no-center">
          <MDBBtn className="job-list-btn job-list-btn:hover" href={`/jobs/${id}`}>Подробнее</MDBBtn>
          <MDBBtn className="job-list-btn job-list-btn:hover" href={`/jobs/${id}`}>Связаться</MDBBtn>
          </div>
      </MDBCardBody>
    </MDBCard>
  )
};


Job.propTypes = {
  job: PropTypes.object.isRequired
};


export default Job;
