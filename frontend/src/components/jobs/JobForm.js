import React, { useReducer, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { addJob, editJob } from '../../actions/jobs';
import { displayMessage } from '../../actions/messages';
import { technologyListUrl } from '../../endpoints';
import MultiSelectField from '../common/MultiSelectField';


const JobForm = props => {
  const initialState = {
    summary: '',
    details: '',
    technologies: [],
    deadline: '',
    budget: ''
  };

  const [state, setState] = useReducer((state, updatedState) => ({...state, ...updatedState}), initialState);

  const job = useLocation().job;

  useEffect(() => {
    if (job) {
      setState({
        summary: job.summary,
        details: job.details,
        technologies: job.technologies,
        deadline: job.deadline,
        budget: job.budget
      })
    }
  }, [job]);

  const handleChange = e => {
    const { name, value } = e.target;
    setState({ [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (state.deadline && new Date(state.deadline) < new Date()) {
      props.displayMessage('danger', 'Неверная дата завершения работ')
    } else if (state.budget < 1) {
      props.displayMessage('danger', "Некорректная сумма оплаты")
    } else if (job) {
        props.editJob(job.id, state, props.history);
      } else {
        props.addJob(state, props.history);
      }
  };

  const { summary, details, technologies, deadline, budget } = state;

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6" className="offset-md-3">
          <MDBCard className="mt-5">
            <MDBCardBody>
              <form onSubmit={handleSubmit}>
                <p className="h4 text-center mb-4">
                  {job ? 'Изменение объявления' : 'Создание объвления'}
                </p>
                <MDBInput
                  label="Краткое описание"
                  outline
                  name="summary"
                  value={summary}
                  onChange={handleChange}
                />
                <MDBInput
                  type="textarea"
                  label="Детальное описание"
                  rows="5"
                  outline
                  name="details"
                  value={details}
                  onChange={handleChange}
                />
                <MultiSelectField
                  initialState={technologies}
                  setState={setState}
                  url={technologyListUrl}
                  fieldName="technologies"
                  label="Предметы с которыми вам нужна помощь"
                />
                <MDBInput
                  label="Срок завершения работы"
                  outline
                  type="date"
                  name="deadline"
                  value={deadline}
                  onChange={handleChange}
                  className="mt-5"
                />
                <MDBInput
                  label="Бюджет в американских долларах (USD)"
                  outline
                  type="number"
                  name="budget"
                  value={budget}
                  onChange={handleChange}
                />
                <div className="text-center mt-4">
                  <MDBBtn className="job-confirm-btn" color="cyan" outline type="submit">
                    Разместить объявление
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


JobForm.propTypes = {
  addJob: PropTypes.func.isRequired,
  editJob: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { addJob, editJob, displayMessage })(JobForm);
