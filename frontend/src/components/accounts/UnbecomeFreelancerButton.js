import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { unbecomeFreelancer } from '../../actions/profiles';
import "./styles.css";

const UnbecomeFreelancerButton = props => {
  const [isOpen, toggle] = useState(false);

  return (
    <>
      <MDBBtn className="big-btn not-frilancer-btn" onClick={() => toggle(!isOpen)}>Перестать быть наставником</MDBBtn>
      <MDBModal isOpen={isOpen} toggle={() => toggle(!isOpen)}>
        <MDBModalHeader toggle={() => toggle(!isOpen)}>Вы уверены, что хотите перестать быть наставником?</MDBModalHeader>
        <MDBModalFooter>
          <MDBBtn color="green" onClick={() => props.unbecomeFreelancer()}>Подтвердить</MDBBtn>
          <MDBBtn color="red" onClick={() => toggle(!isOpen)}>Отмена</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  )
};


UnbecomeFreelancerButton.propTypes = {
  unbecomeFreelancer: PropTypes.func.isRequired
};


export default connect(null, { unbecomeFreelancer })(UnbecomeFreelancerButton);
