import React, { useState } from 'react';
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBBtn, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from 'mdbreact';
import './commonStyles.css';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';


const Navbar = props => {
  const [isOpen, setOpen] = useState(false);

  const { isAuthenticated, user } = props.auth;

  return (
    <MDBNavbar className="NavBar" dark expand="md">
      <MDBNavbarBrand>
        <MDBNavLink style={{ "margin-right": "75px" }} title="XBOCTOB.NET" to="/">
          <strong style={{  "font-style": "normal", "font-weight": "bold" }} className="white-text text-uppercase">XBOCTOB.NET</strong>
        </MDBNavLink>
        </MDBNavbarBrand>
      <MDBNavbarToggler onClick={() => setOpen(!isOpen)} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBNavLink className="NavBarLink NavBarButton NavBarButton:hover" to="/jobs/support">Помощь</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink className="NavBarLink NavBarButton NavBarButton:hover" to="/freelancers">Наставники</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink className="NavBarLink NavBarButton NavBarButton:hover" to="/jobs">Объявления</MDBNavLink>
          </MDBNavItem>
          {/* <MDBNavItem>
            <MDBNavLink className="NavBarLink NavBarButton" to="/job-form">Добавить объявление</MDBNavLink>
          </MDBNavItem> */}
          {
            isAuthenticated ?
              <>
                <MDBNavItem>
                  <MDBNavLink className="NavBarLink NavBarButton NavBarButton:hover" to={`/profile/${user.id}`}>Личный кабинет</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className="NavBarLink NavBarButton" to="#!" onClick={() => props.logout()}>Выйти</MDBNavLink>
                </MDBNavItem>
              </>
            :
              <>
                <MDBNavItem>
                  <MDBNavLink className="NavBarLink NavBarButton NavBarButton:hover" to="/login">Войти</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className="NavBarLink NavBarButton NavBarButton:hover" to="/register">Регистрация</MDBNavLink>
                </MDBNavItem>
              </>
          }
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};


const mapStateToProps = state => ({ auth: state.auth });


export default connect(mapStateToProps, { logout })(Navbar);
