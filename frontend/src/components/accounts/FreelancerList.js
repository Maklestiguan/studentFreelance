import React, { useReducer, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import MultiSelectField from '../common/MultiSelectField';

import { technologyListUrl, cityListUrl, univercityListUrl } from '../../endpoints';
import { loadFreelancerList } from '../../actions/profiles';
import Freelancer from './Freelancer';


const FreelancerList = props => {

  const initialState = {
    technologies: [],
    city: [],
    univercities: []
  };

  useEffect(() => props.loadFreelancerList(), []);

  const [state, setState] = useReducer((state, updatedState) => ({...state, ...updatedState}), initialState);

  const { isLoading, freelancers } = props.freelancerList;

  const { technologies, city, univercities } = state;
  return (
    <>
    <MDBRow middle style={{"marginTop": "20px"}} className="offset-md-1">
      <MDBCol middle className="col-md-3 text-center">
        <MultiSelectField
          initialState={technologies}
          setState={setState}
          url={technologyListUrl}
          fieldName="technologies"
          label="Предметы"
        />
      </MDBCol>
      <MDBCol middle className="col-md-3 text-center">
        <MultiSelectField
          initialState={city}
          setState={setState}
          url={cityListUrl}
          fieldName="city"
          label="Город"
        />
      </MDBCol>
      <MDBCol middle className="col-md-3 text-center">
        <MultiSelectField
          initialState={univercities}
          setState={setState}
          url={univercityListUrl}
          fieldName="univercities"
          label="ВУЗ"
        />
      </MDBCol>
      <MDBCol className="col-md-3 text-left">
        <MDBBtn className="find-by-filter-btn" color="cyan" type="submit">Найти</MDBBtn><br></br>
      </MDBCol>
    </MDBRow>
    <div>
        {freelancers.length > 0 && freelancers.map(
          freelancer => <Freelancer key={freelancer.id} freelancer={freelancer} />
        )}
      </div>
      {
        isLoading &&
          <div className="my-5 text-center spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
      }
   </>
  )
};


FreelancerList.propTypes = {
  freelancerList: PropTypes.object.isRequired,
  loadFreelancerList: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  freelancerList: state.freelancerList
});


export default connect(mapStateToProps, { loadFreelancerList })(FreelancerList)
