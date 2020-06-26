import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';
import { useParams, Link } from 'react-router-dom';

import { loadJobDetail, applyForJob } from '../../actions/jobs';
import JobDeleteButton from './JobDeleteButton';
import ApplicantList from './ApplicantList';
import Payment from './Payment'

const JobDetail = props => {
  const { id } = useParams();

  const [paymentVisible, setPaymentVisible] = useState(false);

  useEffect(() => props.loadJobDetail(id), [id]);

  const { auth } = props;
  const { user, applicants, freelancer, summary, details, technologies_display, deadline, budget, timestamp } = props.jobDetail.job;

  let isOwner;
  let hasApplied;
  let isAccepted;
  let jobHasLoaded;
  if (Object.keys(auth.user).length && Object.keys(props.jobDetail.job).length) {
    if (auth.user.username === user) isOwner = true;
    // check if user has applied for the job
    hasApplied = !!applicants.filter(applicant => applicant.id === auth.user.id).length;
    if (freelancer && auth.user.username === freelancer.username) isAccepted = true;
    jobHasLoaded = true
  }

  return (
    <MDBCard className="my-5">
      <MDBCardBody className="position-relative">
        <div style={{ position: 'absolute', top: '8px', right: '5px' }}>
        {
          isOwner && !freelancer &&
            <>
              <Link to={{pathname: '/job-form', job: props.jobDetail.job}}>
                <MDBBtn size="bg" disabled={!!freelancer}>Редактировать</MDBBtn>
              </Link>
              <JobDeleteButton/>
            </>
        }
        {
          jobHasLoaded && auth.isAuthenticated && !isOwner && !isAccepted &&
            <>
              <MDBBtn size="bg" color={hasApplied ? 'deep-orange' : 'primary'} onClick={() => props.applyForJob(id)}>
                {hasApplied ? 'Отозвать отклик' : 'Откликнуться'}
              </MDBBtn>
            </>
        }
        </div>
        <MDBCardTitle className="text-center">{summary}</MDBCardTitle>
        <MDBCardBody>
          <div>Детали: {details}</div>
          <br />
          <div>Дисциплины: {technologies_display}</div>
          <br />
          <div>Срок выполнения: {deadline}</div>
          <br />
          <div>Бюджет: ${budget}</div>
          <br />
          <div className="text-muted">Опубликовано пользователем {user} {timestamp && new Date(timestamp.toLocaleString()).toDateString()}</div>
          <br />
          {
            freelancer &&
              <div>
                <h5>Наставник: </h5>
                <Link to={`/profile/${freelancer.id}`}>
                  {freelancer.first_name} {freelancer.last_name}
                </Link>
                {isOwner &&
                  <React.Fragment>
                    {paymentVisible ?
                  <Payment job={props.jobDetail.job} /> :
                  <MDBBtn size="bg" color='deep-orange' onClick={setPaymentVisible}>
                    Оплатить
                  </MDBBtn>
                  }
                </React.Fragment>
                }
              </div>
          }
          <br />
          {isOwner && jobHasLoaded && <ApplicantList applicants={applicants} job_id={parseInt(id, 10)} />}
        </MDBCardBody>
      </MDBCardBody>
    </MDBCard>
  )
};


JobDetail.propTypes = {
  loadJobDetail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  jobDetail: PropTypes.object.isRequired
};


const mapStateToProps = state => ({ auth: state.auth, jobDetail: state.jobDetail });


export default connect(mapStateToProps, { loadJobDetail, applyForJob })(JobDetail)
