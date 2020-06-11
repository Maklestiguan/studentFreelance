import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

import { truncateCharacters } from '../../utils';
import { checkJobStatus } from '../../utils';


const JobStatusClient = props => {
  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle className="my-3 text-center">Ваши объявления</MDBCardTitle>
        <MDBTable striped className="text-center">
          <MDBTableHead color="primary-color" textWhite>
          <tr>
            <th>#</th>
            <th>Объявление</th>
            <th>Есть отклики от наставников</th>
            <th>В процессе</th>
            <th>Оплачено</th>
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
                      {checkJobStatus(job.applicants.length > 0)}
                    </th>
                    <th>
                      {checkJobStatus(job.freelancer)}
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


JobStatusClient.propTypes = {
  jobs: PropTypes.array.isRequired,
};


export default JobStatusClient;
