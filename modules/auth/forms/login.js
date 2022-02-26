import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useSelector, useDispatch } from "react-redux";
import { Inputs } from 'core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useWindowSize from "../../../utils/useWindowSize";
import validate from './validate/validate';
import { login } from '../authActions'
import { useEffect } from 'react';

const SimpleForm = props => {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const router = useRouter();
  const authState = useSelector(state => state.authReducer)
  const userLogin = authState?.user;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    password: ""
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (values) => {
    dispatch(login(values, setLoading))
  }

  const handleKeyPress = () => {
    alert('k');
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  useEffect(() => {
    if(authState?.isLoggedIn) {
      if (userLogin?.step_completed === 1 || userLogin?.step_completed === 2) {
        router.push({
          pathname: '/auth/profile',
        })
      } else {
        if (userLogin?.email_verified) {
          router.push({
            pathname: '/user/user-list',
          })
        } else {
          router.push('/auth/profile')
        }
      }
    }
  }, [userLogin])

  const { handleSubmit, invalid, pristine, reset, submitting, submitSucceeded } = props

  return (
    <form autoComplete="off" onSubmit={handleSubmit(submitHandler)}>
      {width > 767 && (
        <>
          <Field
            name="email"
            component={Inputs.inputField}
            type="text"
            label="User Email"
            value={user.name}
            onKeyPress={handleKeyPress}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Please enter you email"
          />
          <div className="password-fields">
            <Field
              name="password"
              onChange={(e) => setPassword({ ...user, password: e.target.value })}
              component={Inputs.inputField}
              type={showPassword ? "text" : "password"}
              label="Password"
              // validate={[passwordRequired]}
              placeholder="Password"
            />
            <span className="icon" aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12.5" cy="12" r="2.6" stroke="#4D4C56" strokeWidth="0.8" />
                <path d="M18.5 12C18.5 10.4087 17.8679 8.88258 16.7426 7.75736C15.6174 6.63214 14.0913 6 12.5 6C10.9087 6 9.38258 6.63214 8.25736 7.75736C7.13214 8.88258 6.5 10.4087 6.5 12L6.54917 12C6.54917 10.4217 7.17613 8.90813 8.29213 7.79213C9.40813 6.67613 10.9217 6.04917 12.5 6.04917C14.0783 6.04917 15.5919 6.67613 16.7079 7.79213C17.8239 8.90813 18.4508 10.4217 18.4508 12H18.5Z" stroke="#4D4C56" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="0.9" y="0.4" width="23.2" height="23.2" rx="6.6" stroke="#4D4C56" strokeWidth="0.8" />
              </svg>
            </span>
          </div>
          <Inputs.buttonField
            type="submit"
            name="login"
            disabled={invalid}
            label="Sign In"
            loading={loading}
          />
        </>
      )}


      {width < 767 && (
        <>
          <Field
            name="email"
            component={Inputs.inputField}
            type="text"
            label="User Email"
            // validate={[userRequired] || apiError}
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Please enter you email"
          />
          <div className="password-fields mobile-side-password">
            <Field
              name="password"
              onChange={(e) => setPassword({ ...user, password: e.target.value })}
              component={Inputs.inputField}
              // validate={[passwordRequired]}
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Enter your password"
            />
            <span className="icon" aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12.5" cy="12" r="2.6" stroke="#4D4C56" strokeWidth="0.8" />
                <path d="M18.5 12C18.5 10.4087 17.8679 8.88258 16.7426 7.75736C15.6174 6.63214 14.0913 6 12.5 6C10.9087 6 9.38258 6.63214 8.25736 7.75736C7.13214 8.88258 6.5 10.4087 6.5 12L6.54917 12C6.54917 10.4217 7.17613 8.90813 8.29213 7.79213C9.40813 6.67613 10.9217 6.04917 12.5 6.04917C14.0783 6.04917 15.5919 6.67613 16.7079 7.79213C17.8239 8.90813 18.4508 10.4217 18.4508 12H18.5Z" stroke="#4D4C56" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="0.9" y="0.4" width="23.2" height="23.2" rx="6.6" stroke="#4D4C56" strokeWidth="0.8" />
              </svg>
            </span>
          </div>
          <Link href="/auth/forgot-password"><a className="forgot-passwrd">Forgot password?</a></Link>
          <div className="bottom-mobile">
            <div className="dont-have">
              <p>Don't have an account? <Link href="/auth/registration">Register</Link></p>
            </div>
            <Inputs.buttonField
              type="submit"
              name="login"
              disabled={invalid}
              label="Sign In"
              loading={loading}
            />
          </div>
        </>
      )}
    </form>
  );
};

export default reduxForm({
  form: 'LoginForm',
  validate
})(SimpleForm);
