import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol } from 'mdbreact';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Freelancer = props => {
  const { id, photo, user, freelancer } = props.freelancer;

  return (
    <MDBCol className="col-md-12 text-center">
      <MDBCard className="my-4">
        <Link to={`/profile/${id}`}><MDBCardImage className="img-fluid" src={photo} waves/></Link>
        <MDBCardBody>
          <MDBCardTitle className="text-left">{user.first_name} {user.last_name}</MDBCardTitle>
          <MDBCardText className="text-right freelancers-list-item">
            {freelancer.hour_rate}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
};


Freelancer.propTypes = {
  freelancer: PropTypes.object.isRequired
};


export default Freelancer;
