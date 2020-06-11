import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { unbecomeFreelancer } from '../../actions/profiles';


const UnbecomeFreelancerButton = props => {
  const [isOpen, toggle] = useState(false);

  return (
    <>
      <MDBBtn color="default" className="mt-2 btn-block" onClick={() => toggle(!isOpen)}>Перестать быть наставником</MDBBtn>
      <MDBModal isOpen={isOpen} toggle={() => toggle(!isOpen)}>
        <MDBModalHeader toggle={() => toggle(!isOpen)}>Вы уверены, что хотите перестать быть наставником?</MDBModalHeader>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => toggle(!isOpen)}>Отмена</MDBBtn>
          <MDBBtn color="primary" onClick={() => props.unbecomeFreelancer()}>Подтвердить</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  )
};


UnbecomeFreelancerButton.propTypes = {
  unbecomeFreelancer: PropTypes.func.isRequired
};


export default connect(null, { unbecomeFreelancer })(UnbecomeFreelancerButton);
