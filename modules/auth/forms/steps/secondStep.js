import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { Field, reduxForm, change } from 'redux-form'
import validate from '../validate/validate'
import { Inputs } from 'core';
import { FiArrowRight } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import useWindowSize from "../../../../utils/useWindowSize";
import { useDispatch, useSelector } from 'react-redux'
import { signupStep2 } from '../../authActions'
import { apiRequest, imageUploader } from '../../../../utils/Utilities'

const imageRequired = value => '';


const SecondStep = props => {
  const { width } = useWindowSize();
  const [images, setImages] = useState([]);
  const [imageURLs, setImagesURLs] = useState([]);
  const [uploadError, setUploadError] = useState(false);
  const [profileImages, setProfileImage] = useState([]);
  const [loading, setLoader] = useState(false);
  const [isImageValid, setImageError] = useState(false);
  const [isImageTouched, setImageTouched] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedChildImage, setSelectedChildImage] = useState(null);
  const [selectedChildImageTwo, setSelectedChildImageTwo] = useState(null);
  const [selectedChildImageThree, setSelectedChildImageThree] = useState(null);
  const dispatch = useDispatch()

  const user = useSelector(state => state.authReducer.user)

  useEffect(() => {
    if (images.length < 4) {
      setUploadError(!uploadError);
    } else{
      setUploadError(!uploadError);
    }
    const newImageUrls = [];
    images.forEach(images => newImageUrls.push(URL.createObjectURL(images)));
    setImagesURLs(newImageUrls);
  }, [images]);

  // function imageuploader(files) {
  //    const formData = new FormData();
  //    let files = e.target.files
  //    formData.append(
  //       "file",
  //       files[0],
  //       files[0].name
  //     );
  //   apiRequest({
  //     url: 'files',
  //     method: 'POST',
  //     data: formData
  //   }).then(success => {
  //     setImages([...images, ...files]);
  //     setProfileImage([...profileImages, success.data.data.url])
  //   }).catch(error => {
  //     console.log('Error', error)
  //   })
    
  // }
    
    const onSubmit = async (values) => {
      // const imageUploaded = await imageUploader([values.imageUpload, values.imageUpload2, values.imageUpload3, values.imageUpload4]);

        values.images = JSON.stringify(profileImages)
        values.email = user.email
        values.step_completed = 2
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          formData.append(key, values[key]);
        })
        dispatch(signupStep2(values, setLoader))
    }

  const { handleSubmit, invalid, previousPage, pristine, reset, submitting, touched } = props

  const reduxValues = useSelector(state => state.form.signupStep2.values)

  return (
    <form className="upload-pics" onSubmit={handleSubmit(onSubmit)}>
      <div className="d-block d-md-none login-text mb-0">
        <a onClick={previousPage}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </a>
        {/* <span>
          LADIES
          <img src="/images/line.png" alt="line" />
        </span> */}
      </div>
      <span className="completion-sign">
        <svg width="60" height="54" viewBox="0 0 60 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.355 21.772C14.355 21.772 17.9122 25.0209 19.8321 27.215C21.7519 29.4091 25.3092 34.291 25.3092 34.291C25.3092 34.291 33.2014 22.7392 39.5496 16.8733C45.8978 11.0073 56.5286 5.44287 56.5286 5.44287" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="0.114502" width="53.6756" height="53.3418" rx="16" fill="white" />
          <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="54" height="54">
            <rect x="0.114502" width="53.6756" height="53.3418" rx="16" fill="white" />
          </mask>
          <g mask="url(#mask0)">
            <path d="M15.4504 21.772C15.4504 21.772 19.0077 25.0209 20.9275 27.215C22.8474 29.4091 26.4046 34.291 26.4046 34.291C26.4046 34.291 34.2969 22.7392 40.6451 16.8733C46.9933 11.0073 57.6241 5.44287 57.6241 5.44287" stroke="black" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </span>
      <p className="auth-register-p-text">
        Registration completed
      </p>
      <h2>
        Welcome, {user?.user_name || ''}
      </h2>
      <div className="text-center">
      <svg width="86" height="2" viewBox="0 0 86 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 1H86" stroke="url(#paint0_linear_340_3843)" />
          <defs>
            <linearGradient id="paint0_linear_340_3843" x1="86" y1="-2.65326" x2="-7.09342e-05" y2="-2.56604" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FA789B" stop-opacity="0.01" />
              <stop offset="0.489981" stop-color="#F02D4E" />
              <stop offset="1" stop-color="#F24362" stop-opacity="0.01" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="text-label">
        Please continue with your profile <br />
        to maximize your opportunity
      </div>
      <div className="images-uploads">
        <div className="big-image">
          <label>
            <Field
              name="imageUpload"
              component={Inputs.uploadFileField}
              type="file"
              accept="image/*"
              onChange={(event) => {
                if (!event.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
                  setImageError(true);
                  event.preventDefault();
                } else {
                  setImageError(false);
                  setImageTouched(true)
                  change('imageUpload', event.target.files[0])
                }
              }}
            />
            {reduxValues?.imageUpload?.length > 0 ?
              <img alt="not fount" width={"250px"} src={URL.createObjectURL(reduxValues?.imageUpload[0])} />
              : <>
                <FiPlus />
                <svg className="dahsed-border" width="424" height="429" viewBox="0 0 424 429" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.75789" y="2.5721" width="420.485" height="423.814" rx="47.4566" stroke="#DDDDDD" strokeWidth="3.5153" strokeDasharray="35.15" />
                </svg>
              </>
            }
          </label>
        </div>
        <div className="small-images big-image">
          <div>
                <label>
                  <Field
                    name="imageUpload2"
                    component={Inputs.uploadFileField}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      if (!event.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
                        setImageError(true);
                        event.preventDefault();
                      } else {
                        setImageError(false);
                        setImageTouched(true)
                        change('imageUpload2', event.target.files[0])
                      }
                    }}
                  />
                  {reduxValues?.imageUpload2?.length > 0 ?
                    <img alt="not fount" width={"250px"} src={URL.createObjectURL(reduxValues?.imageUpload2[0])} />
                    : <>
                      <FiPlus />
                      <svg className="dahsed-border" width="424" height="429" viewBox="0 0 424 429" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1.75789" y="2.5721" width="420.485" height="423.814" rx="47.4566" stroke="#DDDDDD" strokeWidth="3.5153" strokeDasharray="35.15" />
                      </svg>
                    </>
                  }
                </label>
              </div>
              <div>
                <label>
                  <Field
                    name="imageUpload3"
                    component={Inputs.uploadFileField}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      if (!event.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
                        setImageError(true);
                        event.preventDefault();
                      } else {
                        setImageError(false);
                        setImageTouched(true)
                        change('imageUpload3', event.target.files[0])
                      }
                    }}
                  />
                  {reduxValues?.imageUpload3?.length > 0 ?
                    <img alt="not fount" width={"250px"} src={URL.createObjectURL(reduxValues?.imageUpload3[0])} />
                    : <>
                      <FiPlus />
                      <svg className="dahsed-border" width="424" height="429" viewBox="0 0 424 429" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1.75789" y="2.5721" width="420.485" height="423.814" rx="47.4566" stroke="#DDDDDD" strokeWidth="3.5153" strokeDasharray="35.15" />
                      </svg>
                    </>
                  }
                </label>
              </div>
              <div>
                <label>
                  <Field
                    name="imageUpload4"
                    component={Inputs.uploadFileField}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      if (!event.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
                        setImageError(true);
                        event.preventDefault();
                      } else {
                        setImageError(false);
                        setImageTouched(true)
                        change('imageUpload4', event.target.files[0])
                      }
                    }}
                  />
                  {reduxValues?.imageUpload4?.length > 0  ?
                    <img alt="not fount" width={"250px"} src={URL.createObjectURL(reduxValues?.imageUpload4[0])} />
                    : <>
                      <FiPlus />
                      <svg className="dahsed-border" width="424" height="429" viewBox="0 0 424 429" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1.75789" y="2.5721" width="420.485" height="423.814" rx="47.4566" stroke="#DDDDDD" strokeWidth="3.5153" strokeDasharray="35.15" />
                      </svg>
                    </>
                  }
                </label>
              </div>
        </div>
        {isImageTouched && (!reduxValues?.imageUpload || !reduxValues?.imageUpload2 || !reduxValues?.imageUpload3 || !reduxValues?.imageUpload4)  ?
          <span className="error">* Upload at least 4 photos</span>
          : (isImageValid ? "Please Select Image Only" : "")}
        <Field
          name="tagline"
          component={Inputs.inputField}
          type="text"
          label="Your tagline"
          placeholder="Write a few words to tempt"
        />
        <div className="offer-textarea">
          <Field
            name="description"
            component={Inputs.textarea}
            type="text"
            label="What do you offer?"
            placeholder="Describe yourself, and explain why someone should want to take you out as their date "
          />
        </div>
      </div>
      <div className="bottom-mobile register-bottom">
        <div className="secret-input type-submit next-prev">
         {/* <a onClick={previousPage} className="prev">
                     <FiChevronLeft />
                   </a> */}
          <button type="submit" className="next" disabled={invalid}>
            {loading ? <span className="spin-loader-button"></span> : 
            <>
            Next
            <FiArrowRight />
            </>
            }
          </button>
        </div>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'signupStep2', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(SecondStep)