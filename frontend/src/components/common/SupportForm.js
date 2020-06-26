import React, { useReducer } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addSupportTicket } from '../../actions/support';
import { displayMessage } from '../../actions/messages';


const initialState = {
  name: '',
  email: '',
  description: ''
};

const SupportForm = props => {

  const [state, setState] = useReducer((state, updatedState) => ({...state, ...updatedState}), initialState);

  const handleChange = e => {
    const { name, value } = e.target;
    setState({ [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.addSupportTicket(state);
    setState(initialState);
  };

  const { name, email, description } = state;

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6" className="offset-md-3">
          <MDBCard className="mt-5">
            <MDBCardBody>
              <form className="was-validated" onSubmit={handleSubmit}>
                <p className="h4 text-center mb-4">Обращение в поддержку</p>
                <MDBInput
                  id="nameToSupport"
                  label="Введите ваше имя"
                  outline
                  icon="user"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={name}
                  required
                />
                <MDBInput
                  id="emailToSupport"
                  label="Введите ваш email"
                  outline
                  icon="envelope"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
                <MDBInput
                  id="descriptionToSupport"
                  type="textarea"
                  label="Опишите свою проблему"
                  rows="5"
                  outline
                  name="description"
                  value={description}
                  onChange={handleChange}
                  required
                />
                <div className="text-center mt-4">
                  <MDBBtn className="job-confirm-btn" color="cyan" outline type="submit">
                    Отправить
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};


SupportForm.propTypes = {
  addSupportTicket: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { addSupportTicket, displayMessage })(SupportForm);
