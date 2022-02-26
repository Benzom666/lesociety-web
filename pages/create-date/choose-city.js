import React, { useState, useEffect } from 'react';
import { Field, reduxForm, change } from 'redux-form'
import validate from 'modules/auth/forms/validate/validate'
import { FiArrowRight } from "react-icons/fi";
import Header from 'core/header'
import Footer from 'core/footer'
import { Inputs } from 'core';
import { IoIosClose } from 'react-icons/io';
import Link from 'next/link'
import { fetchLocation, fetchLiveLocation, fetchRealLocation } from "../../modules/auth/forms/steps/validateRealTime";
import { countriesCode } from '../../utils/Utilities';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDate from './../../modules/date/confirmDate'
import withAuth from "../../core/withAuth";

const ChooseCity = props => {
    const [locationOptions, setLocation] = useState([]);
    const [places, setPlaces] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loadingLive, setLoadingLive] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const dispatch = useDispatch();
    const state = useSelector(state => state.form.ChooseCity?.values)

    const handleChange = async (value, inputAction) => {
        if(inputAction.action === 'input-change') {
            setInputValue(value)
            fetchRealLocation(value, countriesCode[state?.enter_country?.value], setPlaces);
            // console.log(place)
            // setPlaces(place)
        }
    }

    const toggle = () => setConfirmPopup(!confirmPopup)

    useEffect(() => {
        const fetch = async () => {
          const location = await fetchLocation();
          if(location) {
            const locationOption = location?.map(item => item.isAvailable === 1 && {
              label: item.name,
              value: item.name
           })?.filter(item => item)
           setLocation(locationOption);
        }
        };
        fetch();
      }, [])

      const handleIcon = () => {
        setLoadingLive(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
            if(position.coords.latitude !== undefined && position.coords.longitude !== undefined) {
                const location = await fetchLiveLocation(position.coords.latitude, position.coords.longitude)
                const data = {
                    enter_country:  {label: location[0].country[0].text, value: location[0].country[0].text},
                    enter_city: location[0]
                }
                props.initialize(data);
                setLoadingLive(false)
            }
        }, (err) => setLoadingLive(false), {enableHighAccuracy: true});
    }

    const { handleSubmit, invalid, previousPage, pristine, reset, submitting, touched } = props
    return (
        <div className="inner-page">
            <Header />
                <div className="inner-part-page">
                    <div className="container">
                        <div className="auth-section choose-city">
                            <form onSubmit={handleSubmit} >
                                <div className="d-flex d-md-none justify-content-between align-items-center login-text mb-0">
                                    <a onClick={previousPage}>
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg> */}
                                    </a>
                                    <h6 className="m-0 text-white-50">CREATE A NEW DATE</h6>
                                    <IoIosClose size={32} onClick={toggle}/>
                                </div>
                                <div className="top-head mt-5 mb-3 text-center">
                                    <p></p>
                                    <h2>Spark A New Adventure</h2>
                                    <h6 className="text-white pt-1">Select Your Territory</h6>
                                    <svg width="86" height="2" viewBox="0 0 86 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 1H86" stroke="url(#paint0_linear_1502:2374)" />
                                        <defs>
                                            <linearGradient id="paint0_linear_1502:2374" x1="96.6181" y1="-1.73994" x2="7.45495" y2="-1.73994" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FA789B" stopOpacity="0.01" />
                                                <stop offset="0.489981" stopColor="#F02D4E" />
                                                <stop offset="1" stopColor="#F24362" stopOpacity="0.01" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="content-section">
                                    <p>Please select the location where you would like to be showcased.</p>
                                    <p>Each post is showcased in one location of your choice. </p>
                                    <p>Hence if you wish to have presence in multiple location, you will need several posts.</p>
                                </div>
                                <div>
                                    <Field
                                        name="enter_country"
                                        type="text"
                                        component={Inputs.renderDropdown}
                                        placeholder="Enter Country"
                                        withIcon={true}
                                        label="Country"
                                        subLabel="Traveling? Set up dates prior to you landing"
                                        options={locationOptions}
                                        iconClick={handleIcon}
                                        openMenuOnClick={false}
                                        loading={loadingLive}
                                    />
                                    <Field
                                        name="enter_city"
                                        type="text"
                                        label="Select your city or state"
                                        component={Inputs.renderDropdown}
                                        options={places}
                                        placeholder="Enter City"
                                        withIcon={true}
                                        iconClick={handleIcon}
                                        openMenuOnClick={false}
                                        inputValue={inputValue}
                                        onInputChange={handleChange}
                                        isDisabled={!state?.enter_country?.value}
                                        menuIsOpen={inputValue && places.length}
                                        onChange={(value) => {
                                            setInputValue("");
                                            change('enter_city', value)
                                        }}
                                        loading={loadingLive}
                                    />
                                </div>
                                <div className="bottom-mobile register-bottom">
                                    <div className="secret-input type-submit next-prev">
                                        <Link href="/create-date/date-event" >
                                            <button className="next" disabled={invalid}>  
                                            {/* <span className="spin-loader-button"></span> */}
                                                Next <FiArrowRight />
                                            </button>    
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            <Footer />
            <ConfirmDate
        isOpen={confirmPopup}
        toggle={toggle}
      />
        </div>
    )
}
export default reduxForm({
    form: 'ChooseCity', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
})(withAuth(ChooseCity))