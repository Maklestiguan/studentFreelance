import React, { useReducer, useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBInputSelect } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import { loadProfile, editProfile } from '../../actions/profiles';
import MultiSelectField from '../common/MultiSelectField';
import SelectField from '../common/SelectField';
import { technologyListUrl, timeZoneListUrl, cityListUrl, gendersListUrl, univercityListUrl } from '../../endpoints';
import { displayMessage } from '../../actions/messages';

const ProfileEdit = props => {
  const initialState = {
    id: '',
    freelancer: '',
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    photoFile: '',
    photoUrl: '',
    social_accounts: '',
    time_zone: '',
    bio: '',
    technologies: [],
    cities: [],
    univercities: [],
    hour_rate: 0,
    gender: ''
  };

  const [state, setState] = useReducer((state, updatedState) => ({...state, ...updatedState}), initialState);

  const history = useHistory();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'photo') {
      const photoFile = e.target.files[0];
      if (["image/jpeg", "image/png"].indexOf(photoFile.type) < 0) {
        return;
      }
      const photoUrl = URL.createObjectURL(photoFile);
      setState({ photoFile, photoUrl })
    } else {
      setState({ [name]: value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.editProfile(state, history);
    setState(initialState);
  };

  const prepopulateForm = profile => {
    // extract filename from url
    const fileName = profile.photo.split('/').pop();
    // fetch image file
    fetch(profile.photo)
      .then(response => response.blob())
      .then(file => {
        const photoFile = new File([file], fileName);
        // prepopulate fields with existing user profile data
        setState({
          id: profile.id,
          freelancer: profile.freelancer,
          username: profile.user.username,
          email: profile.user.email,
          first_name: profile.user.first_name,
          last_name: profile.user.last_name,
          photoFile: photoFile,
          photoUrl: profile.photo,
          social_accounts: profile.social_accounts,
          time_zone: profile.time_zone_display,
          bio: profile.freelancer ? profile.freelancer.bio : '',
          technologies: profile.freelancer ? profile.freelancer.technologies : [],
          univercities: profile.freelancer ? profile.freelancer.univercities : [],
          cities: profile.freelancer ? profile.freelancer.cities : [],
          gender: profile.gender
        })
      });
  };

  useEffect(() => {
    if (props.auth.user && Object.keys(props.auth.user).length) {
      props.loadProfile(props.auth.user.id, prepopulateForm)
    }
  }, [props.auth.user]);

  const { id, username, email, first_name, last_name, photoUrl, social_accounts, time_zone, bio, technologies, cities, univercities, hour_rate, gender } = state;
  return (
    <MDBRow>
      <MDBCol md="8" className="offset-md-2">
        <MDBCard className="my-4">
          <MDBCardBody>
            <form onSubmit={handleSubmit}>
              <p className="h4 text-center py-4">Редактировать профиль</p>
              <div className="text-center">
                <img src={photoUrl} className="rounded mb-4" style={{ maxWidth: '13rem', maxHeight: '13rem' }} />
              </div>
              <div className="grey-text">
                <div className="input-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      accept='image/*'
                      className="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                      name="photo"
                      onChange={handleChange}
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                      Изменить фото профиля
                    </label>
                  </div>
                </div>
                <MDBInput
                  labelClass="input-font"
                  label="Ваше имя пользователя"
                  group
                  outline
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="username"
                  value={username}
                  disabled
                />
                <MDBInput
                labelClass="input-font"
                  label="Ваш email"
                  group
                  outline
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <MDBInput
                  labelClass="input-font"
                  label="Ваше имя"
                  group
                  outline
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="first_name"
                  value={first_name}
                  onChange={handleChange}
                />
                <MDBInput
                  labelClass="input-font"
                  label="Ваша фамилия"
                  group
                  outline
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="last_name"
                  value={last_name}
                  onChange={handleChange}
                />
                <SelectField
                  labelClass="input-font"
                  label="Ваш пол"
                  initialState={gender}
                  setState={setState}
                  url={gendersListUrl}
                  fieldName="gender"
                />
                <MDBInput
                  labelClass="input-font"
                  label="Соц. сети"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="social_accounts"
                  value={social_accounts}
                  onChange={handleChange}
                />
                <SelectField
                  labelClass="input-font"
                  label="Ваш часовой пояс"
                  initialState={time_zone}
                  setState={setState}
                  url={timeZoneListUrl}
                  fieldName="time_zone"
                />
                {
                  state.freelancer &&
                    <MDBInput
                      labelClass="input-font"
                      label="Детальная информация"
                      group
                      outline
                      type="textarea"
                      rows="5"
                      validate
                      error="wrong"
                      success="right"
                      name="bio"
                      value={bio}
                      onChange={handleChange}
                    />
                }
                {
                  state.freelancer &&
                  <SelectField
                    initialState={cities}
                    setState={setState}
                    url={cityListUrl}
                    fieldName="cities"
                    label="Ваш город"
                  />
                }
                {
                  state.freelancer &&
                  <SelectField
                    initialState={univercities}
                    setState={setState}
                    url={univercityListUrl}
                    fieldName="univercities"
                    label="Ваш ВУЗ"
                  />
                }
                {
                  state.freelancer &&
                  <MDBInput
                    initialState={hour_rate}
                    label="Стоимость ваших услуг (в долларах США)"
                    outline
                    type="number"
                    name="hour_rate"
                    value={hour_rate}
                    onChange={handleChange}
                    hint="Уточнить в каком формате проводится работа вы можете в форме 'Детальная информация'" 
                  />
                }
                {
                  state.freelancer &&
                  <MDBInput
                    label="Технологии с которыми вы готовы помочь"
                    disabled
                  />
                }
                {
                  state.freelancer &&
                    <MultiSelectField
                      initialState={technologies}
                      setState={setState}
                      url={technologyListUrl}
                      fieldName="technologies"
                    />
                }
              </div>
              <div className="text-center py-4 mt-3">
                <MDBBtn className="NavBarLink submit-cancel-btn submit-cancel-btn:hover" type="submit">Сохранить</MDBBtn>
                <Link to={`profile/${id}`}>
                  <MDBBtn className="NavBarLink submit-cancel-btn submit-cancel-btn:hover">Отмена</MDBBtn>
                </Link>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};


ProfileEdit.propTypes = {
  loadProfile: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({ auth: state.auth });


export default connect(mapStateToProps, { loadProfile, editProfile })(ProfileEdit);
