import React, {useEffect, useState} from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from 'mdbreact';
import { useParams, useLocation, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadProfile, hireFreelancer } from '../../actions/profiles';
import ProfileDeleteButton from './ProfileDeleteButton';
import UnbecomeFreelancerButton from './UnbecomeFreelancerButton';
import FreelancerForm from './FreelancerForm';
import JobStatusClient from './JobStatusClient';
import JobStatusFreelancer from './JobStatusFreelancer';
import "./styles.css";


const Profile = props => {
  const { id } = useParams();
  const location_job_id = useLocation().job_id;

  if (location_job_id) {
    localStorage.setItem('location_job_id', location_job_id)
  }

  const job_id = parseInt(localStorage.getItem('location_job_id'), 10);

  useEffect(() => props.loadProfile(id), [id]);

  const [formIsVisible, setFormIsVisible] = useState(false);

  const { auth } = props;
  const { user, freelancer, job_requests, taken_jobs, photo, social_accounts, time_zone_display, languages_display, city_display, age_display, gender_display } = props.profile.profile;

  let isOwner;

  if (Object.keys(auth.user).length && user) {
    if (auth.user.id === user.id) {
      isOwner = true
    }
  }

  let isFreelancer;
  // on unbecomeFreelancer server returns freelancer object with id=null
  // then on refresh object becomes null
  if (freelancer && freelancer.id) {
    isFreelancer = true
  }

  // check if used has been hired
  const isHired = taken_jobs && !!taken_jobs.filter(job => job.id === job_id).length;
  const hireButton = (
      <MDBBtn color={isHired ? 'deep-orange' : 'primary'} className="mt-2 btn-block" onClick={() => props.hireFreelancer(id, job_id)}>
        {isHired ? 'Нанят (нажмите для отказа от наставника)' : 'Нанять сейчас'}
      </MDBBtn>
  );

  return (
    <>
      <MDBCard className="my-4 position-relative grey-back">
        {/* {
          isOwner &&
            <div style={{ position: 'absolute', top: '8px', right: '5px' }}>
              <Link to="/profile-edit"><MDBBtn color="green" size="bg">Редактировать</MDBBtn></Link>
              <ProfileDeleteButton />
            </div>
        } */}
        <MDBCardTitle className="mt-3 text-center">
          {user && user.first_name} {user && user.last_name} {isOwner && isFreelancer && '(Вы являетесь наставником)'}
        </MDBCardTitle>
        <MDBCardBody>
          <MDBRow>
            <MDBCol className="text-center white-back-profile" md={3}>
              <img src={photo} style={{"margin-bottom": "10px"}} className="img-fluid rounded" />
              {!isOwner && isFreelancer && hireButton}
              {
                isOwner &&
                  <div>
                    <Link className="text-center profile-link" to="/profile-edit">Редактировать профиль</Link><br/>
                  </div>
              }
            </MDBCol>
            {formIsVisible && <FreelancerForm setFormIsVisible={setFormIsVisible} />}
            {
              isOwner && job_requests.length > 0 &&
                <JobStatusClient jobs={job_requests} />
            }
            {
              isOwner && job_requests.length === 0 && !formIsVisible &&
              <MDBCol className="text-center white-back-profile overall-info-jobs offset-md-1" md={8}>
              <MDBCard>
                <MDBCardBody className="z-depth-0">У вас нет активных объявлений о поиске Наставника
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            }
          </MDBRow>
          <MDBRow>
            <MDBCol className="text-center white-back-profile overall-info" md={3}>
                <br />
                <div>Пол: {gender_display}</div>
                <br />
                <div>Возраст: {age_display ? age_display : "Не указано"}</div>
                <br />
                <div>Город: {city_display}</div>
                <br />
                {/* <div>Языки: {languages_display}</div>
                <br /> */}
                {
                  isOwner && isFreelancer &&
                    <>
                      {/* <div>Ваши навыки: {freelancer.bio}</div>
                      <br /> */}
                      {/* <div>Hour rate: {freelancer.hour_rate}</div>
                      <br /> */}
                      <div>Дисциплины: {freelancer.technologies_display}</div>
                      <br/>
                    </>
                }
                {
                  isOwner && !isFreelancer &&
                    <MDBBtn
                      color="success"
                      className="not-frilancer-btn"
                      onClick={() => setFormIsVisible(!formIsVisible)}
                    >
                    {formIsVisible ? <span>Скрыть<br />форму</span> : 'Стать наставником'}
                    </MDBBtn>
                }
                {isOwner && isFreelancer && <UnbecomeFreelancerButton className="not-frilancer-btn" />}
            </MDBCol>
              {
                isOwner && taken_jobs.length > 0 &&
                  <JobStatusFreelancer username={auth.user.username} jobs={taken_jobs} />
              }
              {
                isOwner && taken_jobs.length === 0 && !formIsVisible &&
                <MDBCol className="text-center white-back-profile overall-info-jobs offset-md-1" md={8}>
                  <MDBCard>
                    <MDBCardBody className="z-depth-0">У вас нет активных объявлений в роли Наставника
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              }
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </>
  )
};


Profile.propTypes = {
  loadProfile: PropTypes.func.isRequired,
  hireFreelancer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};


const mapStateToProps = state => ({ auth: state.auth, profile: state.profile });


export default connect(mapStateToProps, { loadProfile, hireFreelancer })(Profile);
