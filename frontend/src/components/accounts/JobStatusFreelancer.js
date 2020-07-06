import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBTable, MDBTableBody, MDBTableHead, MDBCol } from 'mdbreact';

import { truncateCharacters } from '../../utils';
import { checkJobStatus } from '../../utils';


const JobStatusFreelancer = props => {
  console.log(props)
  return (
    <MDBCol className="col-md-8 offset-md-1">
    <MDBCard border="default">
      <MDBCardBody>
        <MDBCardTitle className="my-3 text-center">Ваши отклики в роли наставника</MDBCardTitle>
        <MDBTable hover scrollY="true" striped className="text-center">
          <MDBTableHead color="primary-color" textWhite>
          <tr>
            <th>#</th>
            <th>Объявление</th>
            <th>Откликнулись</th>
            <th>Выбраны наставником</th>
            <th>Завершено</th>
          </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              props.jobs.map((job, index) => {
                return (
                  <tr key={job.id}>
                    <th>{index + 1}</th>
                    <th><Link to={`/jobs/${job.id}`} className="text-primary">{truncateCharacters(job.summary, 20)}</Link></th>
                    <th>
                      {checkJobStatus(job.applicants.some(el => el.id === props.id))}
                    </th>
                    <th>
                      {checkJobStatus(job.freelancer.id === props.id)}
                    </th>
                    <th>
                      {checkJobStatus(job.done)}
                    </th>
                  </tr>
                )
              })
            }
          </MDBTableBody>
        </MDBTable>
      </MDBCardBody>
    </MDBCard>
    </MDBCol>
  )
};


JobStatusFreelancer.propTypes = {
  username: PropTypes.string.isRequired,
  jobs: PropTypes.array.isRequired
};


export default JobStatusFreelancer;
