import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol } from 'mdbreact';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Freelancer = props => {
  const { id, photo, user, freelancer } = props.freelancer;

  return (
    <>
      <MDBCard className="col-md-10 offset-md-1 z-depth-0"
      style={{
        "marginBottom": "20px"
        }}>
        <MDBCardBody
          border="default" 
          className="position-relative z-depth-0">
          <MDBCardTitle className="text-left">{user.first_name} {user.last_name}
          </MDBCardTitle>
          <Link to={`/profile/${id}`}>
            <img className="rounded float-left"  src={photo} alt="Unable to load" height="125" width="125" waves/>
          </Link>
          <MDBCardText className="freelancers-list-item">
            {freelancer.bio}
          </MDBCardText>
          <MDBCardText className="freelancers-list-cost-item">
            {freelancer.hour_rate}
          </MDBCardText>
          <MDBCardText className="freelancers-list-item">
            {freelancer.technologies_display}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </>
  )
};


Freelancer.propTypes = {
  freelancer: PropTypes.object.isRequired
};


export default Freelancer;
