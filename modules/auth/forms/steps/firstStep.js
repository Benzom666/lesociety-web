import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { Field, reduxForm } from 'redux-form'
import validate from '../validate/validate'
import { Inputs } from 'core';
import { FiArrowRight } from "react-icons/fi";
import useWindowSize from "../../../../utils/useWindowSize";
import { existEmail, existUsername, fetchLocation } from "./validateRealTime";
import { useDispatch } from 'react-redux'

const bodyType = [
  {
    id: 'Slim',
    name: 'Slim'
  },
  {
    id: 'Fit',
    name: 'Fit'
  },
  {
    id: 'Average',
    name: 'Average'
  },
  {
    id: 'Curvy',
    name: 'Curvy'
  },
  {
    id: 'Full Figured',
    name: 'Full Figured'
  }
];

const Ethnicity = [
  {
    id: 'White',
    name: 'White'
  },
  {
    id: 'Black',
    name: 'Black'
  },
  {
    id: 'Hispanic',
    name: 'Hispanic'
  },
  {
    id: 'Asian',
    name: 'Asian'
  },
  {
    id: 'Other',
    name: 'Other'
  }
];

const FirstStep = props => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoader] = useState(false);
  const [loadingSubmit, setLoaderSubmit] = useState(false);
  const [isValid, setValid] = useState(false);
  const [loadingUsername, setLoaderUsername] = useState(false);
  const [isValidUsername, setValidUsername] = useState(false);
  const [locationOptions, setLocation] = useState([]);  
  const dispatch = useDispatch()
  const { width } = useWindowSize();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeEmail = (event) => {
    setValid(false);
    existEmail(event.target.value, setLoader, setValid, dispatch);
  };

  const handleChangeUser = (event) => {
    setValidUsername(false);
    existUsername(event.target.value, setLoaderUsername, setValidUsername, dispatch);
  };

  const submitHandler = (values) => {
    props.onSubmit(values, setLoaderSubmit)
  }
  
  useEffect(() => {
    const fetch = async () => {
      const location = await fetchLocation();
      if(location) {
        const locationOption = location.map(item => item.isAvailable === 1 && {
          label: item.name,
          value: item.name
       })
       setLocation(locationOption);
    }
    };
    fetch();
  }, [])

  const { handleSubmit, previousPage, invalid, pristine, reset, submitting } = props

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="d-block d-md-none login-text">
        <a href="registration">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </a>
        <span>
          GENTLEMEN
          <img src="/images/line.png" alt="line" />
        </span>
      </div>
      <h2>
        Let’s sign you up.
      </h2>
      <p className="auth-register-p-text">
        100% <span>Free</span> Service. <label>Ladies pay for every post.</label>
      </p>

      <Field
        name="email"
        type="text"
        component={Inputs.inputField}
        label="Email"
        placeholder="E.g. Janedoe@gmail.com"
        onChange={handleChangeEmail}
        loading={loading}
        isValid={isValid}
      />
      <Field
        name="user_name"
        type="text"
        component={Inputs.inputField}
        label="Username"
        placeholder="Visible by all members"
        onChange={handleChangeUser}
        loading={loadingUsername}
        isValid={isValidUsername}
      />
      <div className="password-fields">
        <Field
          name="password"
          component={Inputs.inputField}
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Minimum 6 character"
        />
        <span className="icon" aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12.5" cy="12" r="2.6" stroke="#4D4C56" strokeWidth="0.8" />
            <path d="M18.5 12C18.5 10.4087 17.8679 8.88258 16.7426 7.75736C15.6174 6.63214 14.0913 6 12.5 6C10.9087 6 9.38258 6.63214 8.25736 7.75736C7.13214 8.88258 6.5 10.4087 6.5 12L6.54917 12C6.54917 10.4217 7.17613 8.90813 8.29213 7.79213C9.40813 6.67613 10.9217 6.04917 12.5 6.04917C14.0783 6.04917 15.5919 6.67613 16.7079 7.79213C17.8239 8.90813 18.4508 10.4217 18.4508 12H18.5Z" stroke="#4D4C56" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="0.9" y="0.4" width="23.2" height="23.2" rx="6.6" stroke="#4D4C56" strokeWidth="0.8" />
          </svg>
        </span>
      </div>
      <div>
        <Field
          name="location"
          type="text"
          component={Inputs.renderDropdown}
          label="Location"
          placeholder="Enter the city you currently reside in"
          valueField='value'
          id="location1"
          options={locationOptions}
        />
        <div className="age-field">
          <Field
            name="age"
            type="number"
            component={Inputs.inputField}
            label="Age"
          />
        </div>
        <div className="auth-radio">
          <Field
            label="Body Type"
            name="body_type"
            options={bodyType}
            value={bodyType}
            component={Inputs.radioField}
          />
        </div>
        <div className="auth-radio">
          <Field
            label="Ethnicity"
            name="ethnicity"
            options={Ethnicity}
            value={Ethnicity}
            component={Inputs.radioField}
          />
        </div>

        {width < 767 && (
          <>
            <div className="d-flex checkbox-label">
              <p className="next-text">By clicking “Next” I certify that I’m at least 18 years old and agree to the Secret Time <Link href="/">PrivacyPolicy</Link> and <Link href="/">Terms</Link></p>
            </div>
            <div className="bottom-mobile register-bottom">
              <div className="secret-input type-submit">
                <button type="submit" className="next" disabled={invalid}>
                  {loadingSubmit ? <span className="spin-loader-button"></span> :
                  <>
                   Next
                  <FiArrowRight />
                  </>
                  }
                </button>
              </div>
            </div>
          </>
        )}
        {width > 767 && (
          <div className="bottom-mobile register-bottom">
            <div className="secret-input type-submit">
                <button type="submit" className="next" disabled={invalid}>
                  {loadingSubmit ? <span className="spin-loader-button"></span> :
                  <>
                   Next
                  <FiArrowRight />
                  </>
                  }
                </button>
            </div>
            <p className="next-text">By clicking “Next” I certify that I’m at least 18 years old and agree to the Secret Time <Link href="/">PrivacyPolicy</Link> and <Link href="/">Terms</Link></p>
          </div>
        )}
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'RegisterForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(FirstStep)