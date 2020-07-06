import axios from 'axios';

import {
  FREELANCER_LIST_LOADING,
  FREELANCER_LIST_LOADED,
  FREELANCER_LIST_ERROR,
  PROFILE_LOADING,
  PROFILE_LOADED,
  PROFILE_ERROR,
  AUTH_LOGOUT
} from './types';
import {
  freelancerListUrl,
  profileDetailEditDeleteUrl,
  becomeFreelancerUrl,
  unbecomeFreelancerUrl,
  hireFreelancerUrl
} from '../endpoints';
import { addToken } from '../utils';
import { displayMessage } from './messages';
import { loadUser } from './auth';


export const loadFreelancerList = (technologies, cities, univercities) => dispatch => {
  dispatch({ type: FREELANCER_LIST_LOADING });
  let filterQuery = "";
  if (technologies && technologies.length) {
    filterQuery += `?disciplines=${technologies.join('/')}`;
  }
  if (cities && cities.length) {
    filterQuery += `?cities=${cities.join('/')}`;
  }
  if (univercities && univercities.length) {
    filterQuery += `?univercities=${univercities.join('/')}`;
  }
  axios.get(filterQuery ? freelancerListUrl + filterQuery : freelancerListUrl)
    .then(response => dispatch({ type: FREELANCER_LIST_LOADED, payload: response.data }))
    .catch(error => {
      dispatch({ type: FREELANCER_LIST_ERROR });
      console.log(error)
    });
};


export const loadProfile = (id, prepopulateForm) => dispatch => {
  dispatch({ type: PROFILE_LOADING });
  axios.get(profileDetailEditDeleteUrl(id))
    .then(response => {
      dispatch({ type: PROFILE_LOADED, payload: response.data });
      if (prepopulateForm) prepopulateForm(response.data)
    })
    .catch(error => {
      dispatch({ type: PROFILE_ERROR });
      dispatch(displayMessage('danger', error.response.data));
      console.log(`Status: ${error.response.status}`, error.response.data)
    });
};


const headers = {
  headers: {
    Authorization: `Token ${localStorage.getItem('token')}`,
    'Content-Type': 'multipart/form-data'
  }
};


export const editProfile = (profile, history) => dispatch => {
  const data = new FormData();

  data.append('email', profile.email);
  data.append('first_name', profile.first_name);
  data.append('last_name', profile.last_name);

  data.append('photo', profile.photoFile);
  data.append('social_accounts', profile.social_accounts);
  data.append('time_zone', profile.time_zone);
  data.append('languages', profile.languages);
  data.append('gender', profile.gender);

  if (profile.freelancer) {
    data.append('bio', profile.bio);
    data.append('technologies', profile.technologies);
    if (profile.cities) data.append('cities', profile.cities);
    if (profile.univercities) data.append('univercities', profile.univercity)
    data.append('hour_rate', profile.hour_rate)
  }
  axios.put(profileDetailEditDeleteUrl(profile.id), data, addToken())
    .then(response => {
      dispatch({ type: PROFILE_LOADED, payload: response.data });
      loadUser(dispatch);
      history.push(`/profile/${profile.id}`)
    })
    .catch(error => {
      dispatch({ type: PROFILE_ERROR });
      dispatch(displayMessage('danger', error.response.data));
      console.log(`Status: ${error.response.status}`, error.response.data)
    });
};


export const deleteProfile = (id, history) => dispatch => {
  axios.delete(profileDetailEditDeleteUrl(id), addToken())
    .then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      dispatch({ type: AUTH_LOGOUT});
      history.push('/')
    })
    .catch(error => {
      dispatch(displayMessage('danger', error.response.data));
      console.log(`Status: ${error.response.status}`, error.response.data)
    });
};


export const becomeFreelancer = (data, setFormIsVisible) => dispatch => {
  axios.post(becomeFreelancerUrl, data, addToken())
    .then(response => {
      dispatch({ type: PROFILE_LOADED, payload: response.data });
      setFormIsVisible(false);
      loadUser(dispatch);
      dispatch(displayMessage('success', 'Поздравляем! Теперь вы наставник!'))
    })
    .catch(error => {
      dispatch({ type: PROFILE_ERROR });
      dispatch(displayMessage('danger', error.response.data));
      console.log(`Status: ${error.response.status}`, error.response.data)
    });
};


export const unbecomeFreelancer = () => dispatch => {
  axios.get(unbecomeFreelancerUrl, addToken())
    .then(response => {
      dispatch({ type: PROFILE_LOADED, payload: response.data });
      loadUser(dispatch);
    })
    .catch(error => {
      dispatch({ type: PROFILE_ERROR });
      dispatch(displayMessage('danger', error.response.data));
      console.log(`Status: ${error.response.status}`, error.response.data)
    });
};


export const hireFreelancer = (freelancer_id, job_id) => dispatch => {
  axios.get(hireFreelancerUrl(freelancer_id, job_id), addToken())
    .then(response => dispatch({ type: PROFILE_LOADED, payload: response.data }))
    .catch(error => {
      dispatch(displayMessage('danger', "Unable to process this operation" /*error.response.data*/));
      console.log(`Status: ${error.response.status}`, error.response.data)
    });
};

// todo implement logout function inside deleteProfile function

