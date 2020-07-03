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
    city: '',
    univercity: '',
    gender: ''
  };

  const [state, setState] = useReducer((state, updatedState) => ({...state, ...updatedState}), initialState);

  const history = useHistory();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'photo') {
      const photoFile = e.target.files[0];
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
          time_zone: profile.time_zone,
          bio: profile.freelancer ? profile.freelancer.bio : '',
          technologies: profile.freelancer ? profile.freelancer.technologies : '',
          city: profile.city,
          gender: profile.gender
        })
      });
  };

  useEffect(() => {
    if (props.auth.user && Object.keys(props.auth.user).length) {
      props.loadProfile(props.auth.user.id, prepopulateForm)
    }
  }, [props.auth.user]);

  const { id, username, email, first_name, last_name, photoUrl, social_accounts, time_zone, bio, technologies, city, univercity, gender } = state;
  console.log(state);
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
                  label="Ваш город"
                  initialState={city}
                  setState={setState}
                  url={cityListUrl}
                  fieldName="city"
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
                      label="Ваш опыт"
                      group
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
                    initialState={city}
                    setState={setState}
                    url={cityListUrl}
                    fieldName="city"
                    label="Ваш город"
                  />
                }
                {
                  state.freelancer &&
                  <SelectField
                    initialState={univercity}
                    setState={setState}
                    url={univercityListUrl}
                    fieldName="univercity"
                    label="Ваш ВУЗ"
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
                <MDBBtn color="green" type="submit">Сохранить</MDBBtn>
                <Link to={`profile/${id}`}><MDBBtn color="red">Отмена</MDBBtn></Link>
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
