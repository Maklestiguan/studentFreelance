import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteProfile } from '../../actions/profiles';


const ProfileDeleteButton = props => {
  const [isOpen, toggle] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  return (
    <>
      <MDBBtn color="danger" size="bg" onClick={() => toggle(!isOpen)}>Удалить</MDBBtn>
      <MDBModal isOpen={isOpen} toggle={() => toggle(!isOpen)}>
        <MDBModalHeader toggle={() => toggle(!isOpen)}>Вы уверены, что хотите удалить свой профиль?</MDBModalHeader>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => toggle(!isOpen)}>Отмена</MDBBtn>
          <MDBBtn color="primary" onClick={() => props.deleteProfile(id, history)}>Удалить</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  )
};


ProfileDeleteButton.propTypes = {
  deleteProfile: PropTypes.func.isRequired
};


export default connect(null, { deleteProfile })(ProfileDeleteButton);
