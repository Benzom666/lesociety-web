import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useSelector, useDispatch } from "react-redux";
import { Inputs } from 'core';
import Link from 'next/link'
import * as Yup from "yup";
import { toast } from 'react-toastify';
import useWindowSize from "../../../utils/useWindowSize";
import validate from './validate/validate'

const SimpleForm = props => {

  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const [showText, setShowText] = useState(false);
  const [user, setUser] = useState({
    email: "",
  });


  const submitHandler = async (e) => {
    e.preventDefault();
    setShowText(!showText);
  }

  const handleClickBack = () => {
    setShowText(!showText);
  };

  const { handleSubmit, invalid, pristine, reset, submitting } = props

  return (
    <form className="forgot-password" autoComplete="off" onSubmit={submitHandler}>
      <>
        <Field
          name="email"
          type="text"
          component={Inputs.inputField}
          label="Email"
          placeholder="Enter your email"
        />
        {showText &&
          <p className="check-mail-text text-center">
            Please check your email and follow the link to recover your password.
          </p>
        }
        <div className="bottom-mobile">
          {!showText &&
            <Field
              component={Inputs.buttonField}
              type="submit"
              name="login"
              disabled={invalid}
              label="Next"
            />
          }
          {showText &&
            <div className="secret-input type-submit">
              <a className="next" onClick={handleClickBack}>Back</a>
            </div>
          }
        </div>

      </>
    </form>
  );
};

export default reduxForm({
  form: 'forgotpassword',
  validate
})(SimpleForm);
