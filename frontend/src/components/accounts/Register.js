import React, { useReducer } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import "./styles.css";
import { register } from '../../actions/auth';

const initialState = {
  username: '',
  email: '',
  password1: '',
  password2: ''
};

const Register = props => {

  const [state, setState] = useReducer((state, updatedState) => ({...state, ...updatedState}), initialState);

  const handleChange = e => {
    const { name, value } = e.target;
    setState({ [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.register(state);
    setState(initialState);
  };

  // redirect to add job page after logging in
  // which is done automatically on registering
  if (props.isAuthenticated) {
    return <Redirect to="/job-form" />
  }

  const { username, email, password1, password2 } = state;

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6" className="offset-md-3">
          <MDBCard className="mt-4">
            <MDBCardBody>
              <form onSubmit={handleSubmit}>
                <p className="h4 text-center py-4">Зарегистрироваться</p>
                <div className="grey-text">
                  <MDBInput
                    label="Имя пользователя"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                  <MDBInput
                    label="Email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                  <MDBInput
                    label="Пароль"
                    icon="lock"
                    group
                    type="password"
                    validate
                    error="wrong"
                    success="right"
                    name="password1"
                    value={password1}
                    onChange={handleChange}
                  />
                  <MDBInput
                    label="Повторите пароль"
                    icon="lock"
                    group
                    type="password"
                    validate
                    name="password2"
                    value={password2}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn className="button-login big-btn" type="submit">
                    Register
                  </MDBBtn>
                </div>
                <p>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};


Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { register })(Register);
