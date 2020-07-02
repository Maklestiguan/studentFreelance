import React, { useReducer, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import MultiSelectField from '../common/MultiSelectField';

import { technologyListUrl, cityListUrl, univercityListUrl } from '../../endpoints';
import { loadFreelancerList } from '../../actions/profiles';
import Freelancer from './Freelancer';

const initialState = {
  technologies: [],
  city: [],
  univercities: []
};

const FreelancerList = props => {

  const [state, setState] = useReducer((state, updatedState) => ({...state, ...updatedState}), initialState);

  const { isLoading, freelancers } = props.freelancerList;

  initialState.filteredFreelancers = freelancers;

  const { technologies, city, univercities } = state;

  useEffect(() => props.loadFreelancerList(), []);
  const handleSubmit = useCallback(() => props.loadFreelancerList(technologies, city, univercities), [technologies, city, univercities]);

  return (
    <>
    <MDBRow 
      middle       
      style={{
        "marginTop": "20px",
        "backgroundColor": "#E5E5E5",
        "margin-left": "0px",
        "margin-right": "0px"
        }}
    >
      <MDBCol middle className="col-md-2 offset-md-1 text-center">
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
        <MDBBtn className="find-by-filter-btn" color="cyan" onClick={handleSubmit}>Найти</MDBBtn><br></br>
      </MDBCol>
    </MDBRow>
    <div style={{"backgroundColor": "#E5E5E5"}}>
        {freelancers.length > 0 && freelancers.map(
          freelancer => <Freelancer key={freelancer.id} freelancer={freelancer} />
        )}
        <footer className="text-center" style={{ "backgroundColor": "#E5E5E5" }}>asd</footer>
      </div>
      {
        isLoading &&
          <div className="offset-md-6 text-center spinner-border" role="status">
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
