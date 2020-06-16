import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { useParams, useHistory } from 'react-router-dom';

import { deleteJob } from '../../actions/jobs';


const JobDeleteButton = () => {
  const [isOpen, toggle] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  return (
    <>
      <MDBBtn color="danger" size="bg" onClick={() => toggle(!isOpen)}>Удалить</MDBBtn>
      <MDBModal isOpen={isOpen} toggle={() => toggle(!isOpen)}>
        <MDBModalHeader toggle={() => toggle(!isOpen)}>Вы уверены, что хотите удалить это объявление?</MDBModalHeader>
        <MDBModalFooter>
          <MDBBtn color="red" onClick={() => toggle(!isOpen)}>Отмена</MDBBtn>
          <MDBBtn color="green" onClick={() => deleteJob(id, history)}>Удалить</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  )
};


export default JobDeleteButton;
