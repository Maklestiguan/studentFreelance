import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import "./styles.css";
import { login } from '../../actions/auth';


const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    props.login({ email, password });
  };

  // redirect to add job page after successful login
  if (props.isAuthenticated) {
    return <Redirect to="/job-form" />
  }

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6" className="offset-md-3">
          <MDBCard className="mt-5">
            <MDBCardBody>
              <form onSubmit={handleSubmit}>
                <p className="h4 text-center py-4">Войти</p>
                <div className="grey-text">
                  <MDBInput
                    label="Email"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <MDBInput
                    label="Пароль"
                    icon="lock"
                    group
                    type="password"
                    validate
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <MDBBtn className="button-login big-btn" type="submit">ВОЙТИ</MDBBtn><br></br>
                  <Link to="/register">Забыли пароль?</Link>
                </div>
              </form>
            </MDBCardBody>
            <footer className="footer-login">
              <p className="mt-3 footer-text">Еще не зарегистрированы?&#160;
                <Link className="footer-link" to="/register">Зарегистрироваться</Link>
              </p>
            </footer>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};


Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { login })(Login);
