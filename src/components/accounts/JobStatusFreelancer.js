import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

import { truncateCharacters } from '../../utils';
import { checkJobStatus } from '../../utils';


const JobStatusFreelancer = props => {
  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle className="my-3 text-center">Объявления на которые вы откликнулись и их статус</MDBCardTitle>
        <MDBTable striped className="text-center">
          <MDBTableHead color="primary-color" textWhite>
          <tr>
            <th>#</th>
            <th>Объявление</th>
            <th>Откликнулись</th>
            <th>В работе</th>
            <th>Завершено</th>
          </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              props.jobs.map((job, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th><Link to={`/jobs/${job.id}`} className="text-primary">{truncateCharacters(job.summary, 20)}</Link></th>
                    <th>
                      {checkJobStatus(true)}
                    </th>
                    <th>
                      {checkJobStatus(job.freelancer.username === props.username)}
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
  )
};


JobStatusFreelancer.propTypes = {
  username: PropTypes.string.isRequired,
  jobs: PropTypes.array.isRequired
};


export default JobStatusFreelancer;
