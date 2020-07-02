import React,  { useMemo } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';
import PropTypes from 'prop-types';
import '../common/commonStyles.css';
import './checkout.css';

const Job = props => {
  const { id, summary, technologies_display, user, timestamp } = props.job;
  const date = useMemo(() => new Date(timestamp.toLocaleString()).toDateString(), [timestamp]);

  return (
    <MDBCard className="col-md-10 offset-md-1 z-depth-0"
      style={{
        "marginBottom": "20px"
        }}>
      <MDBCardBody
       border="default" 
       className="position-relative z-depth-0">
        <div className="flex-item-equal-half-no-center">
          <MDBCardTitle mt-3 className="text-left">
            <p style={{
              "fontSize": "20px",
              "marginBottom": "8px",
              "fontWeight": "800"
              }}>{user} <br></br>
            </p>
            <p style={{
              "fontSize": "16px",
              "marginBottom": "8px"
              }}>{summary}<br></br>
            </p>
            <p style={{
              "color": "#898989",
              "fontSize": "14px",
              "marginBottom": "8px"
              }}>{technologies_display}<br></br>
            </p>
          </MDBCardTitle>
          <span
            className="position-absolute text-muted"
            style={{ top: "25px", right: "28px" }}
          >
            {date}
          </span>
        </div>
        <div className="flex-item-equal-half-no-center">
          <MDBBtn className="job-list-btn job-list-btn:hover" href={`/jobs/${id}`}>Подробнее</MDBBtn>
          {/* <MDBBtn className="job-list-btn job-list-btn:hover" href={`/jobs/${id}`}>Связаться</MDBBtn> */}
          </div>
      </MDBCardBody>
    </MDBCard>
  )
};


Job.propTypes = {
  job: PropTypes.object.isRequired
};


export default Job;
