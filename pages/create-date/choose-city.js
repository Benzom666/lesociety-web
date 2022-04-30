import React, { useState, useEffect } from 'react';
import { Field, reduxForm, change, initialize } from 'redux-form'
import validate from 'modules/auth/forms/validate/validate'
import { FiArrowRight } from "react-icons/fi";
import Footer from 'core/footer'
import { Inputs } from 'core';
import { IoIosClose } from 'react-icons/io';
import Link from 'next/link'
import { fetchLocation, fetchLiveLocation, fetchRealLocation } from "../../modules/auth/forms/steps/validateRealTime";
import { countriesCode, apiRequest, dateCategory } from '../../utils/Utilities';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDate from './../../modules/date/confirmDate';
import withAuth from "../../core/withAuth";
import useWindowSize from 'utils/useWindowSize';
import router from 'next/router';
import { components } from 'react-select';

const ChooseCity = props => {
    const [locationOptions, setLocation] = useState([]);
    const [places, setPlaces] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loadingLive, setLoadingLive] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const dispatch = useDispatch();
    const { width } = useWindowSize()
    const state = useSelector(state => state.form.ChooseCity?.values)
    const user = useSelector(state => state.authReducer.user)

    const handleChange = async (value, inputAction) => {
        if (inputAction.action === 'input-change') {
            setInputValue(value)
            fetchRealLocation(value, countriesCode[state?.enter_country?.value], setPlaces);
        }
    }

    const toggle = () => setConfirmPopup(!confirmPopup);

    const fetchDraftedDate = async () => {
        try {
            const res = await apiRequest({
                url: "date",
                params: {
                    user_name: user?.user_name
                }
            })
            if (res.data.data?.dates) {
                const draftedDate = res.data.data?.dates.find(item => item?.date_status === false)
                if (draftedDate) {
                    const category = dateCategory.find(item => item?.label === draftedDate?.standard_class_date || item?.label === draftedDate?.middle_class_dates || item?.label === draftedDate?.executive_class_dates)
                    const country = Object.keys(countriesCode).find(key => countriesCode[key]?.toLowerCase() === draftedDate.country_code?.toLowerCase())
                    dispatch(initialize('ChooseCity', {
                        enter_country: { label: country, value: draftedDate.country_code },
                        enter_city: {
                            name: draftedDate?.location,
                            country: [{
                                short_code: draftedDate.country_code,
                                text: country
                            }],
                            label: draftedDate?.location + ", " + draftedDate?.province,
                            province: [{ short_code: draftedDate?.province?.toUpperCase() }]
                        }
                    }));
                    dispatch(initialize('CreateStepOne', { 'search_type': category }));
                    dispatch(initialize('CreateStepTwo', { education: draftedDate?.price }))
                    dispatch(initialize('CreateStepThree', { education: draftedDate?.date_length }))
                    dispatch(initialize('CreateStepFour', { date_description: draftedDate?.date_details }))
                    router.push('/create-date/date-event?drafted=true')
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const location = await fetchLocation();
            if (location) {
                const locationOption = location?.map(item => item.isAvailable === 1 && {
                    label: item.name,
                    value: countriesCode[item.name]
                })?.filter(item => item)
                setLocation(locationOption);
            }
        };
        fetch();
        if (user.country && user.location) {
            const data = {
                enter_country: { label: user.country, value: countriesCode[user.country] },
                enter_city: {
                    name: user.location,
                    country: user.country,
                    label: user.location + ", " + user?.province?.toUpperCase(),
                    province: [{ short_code: user?.province?.toUpperCase() }]
                }
            }
            props.initialize(data);
        }
        if (!router?.query.edit) {
            fetchDraftedDate();
        }
    }, [])

    const handleIcon = () => {
        setLoadingLive(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
            if (position.coords.latitude !== undefined && position.coords.longitude !== undefined) {
                const location = await fetchLiveLocation(position.coords.latitude, position.coords.longitude)
                const data = {
                    enter_country: { label: location[0].country[0].text, value: location[0].country[0].short_code },
                    enter_city: {
                        name: location[0].name,
                        country: location[0].country[0],
                        label: location[0].name + ", " + location[0].province[0]?.short_code?.split("-")[1]?.toUpperCase(),
                        province: location[0]?.province
                    }
                }
                props.initialize(data);
                setLoadingLive(false)
            }
        }, (err) => setLoadingLive(false), { enableHighAccuracy: true });
    }

    const { handleSubmit, invalid, previousPage, pristine, reset, submitting, touched } = props
    return (
        <div className="inner-page">
            {/* {width > 767 && <HeaderLoggedIn />} */}
            <div className="inner-part-page">
                <div className="container">
                    <div className="auth-section choose-city">
                        <form onSubmit={handleSubmit} >
                            <div className="d-flex d-md-none justify-content-between align-items-center login-text mb-0">
                                <a onClick={previousPage}>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg> */}
                                </a>
                                <h6 className="m-0 text-white-50">Create a New Date</h6>
                                <IoIosClose className="mouse-point" size={32} onClick={toggle} />
                            </div>
                            {width > 767 && (
                                <div className='d-flex justify-content-center'>
                                    <h3 className="text-center">Create a New Date</h3>
                                    <IoIosClose className="desk-close-first mouse-point" size={32} onClick={toggle} />
                                </div>
                            )}
                            <div className="top-head mt-5 mb-3 text-center">
                                <p></p>
                                <h2>Spark A New Adventure</h2>
                                <h6 className="text-white pt-1">Select Your Territory</h6>
                                <svg width="86" height="2" viewBox="0 0 86 2" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '-28px' }}>
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
                                <p>Each post is showcased in one location <br /> of your choice. </p>
                                <p>Hence if you wish to have presence in multiple location, you will need several posts.</p>
                            </div>
                            <div>
                                <Field
                                    name="enter_country"
                                    type="text"
                                    component={Inputs.renderDropdown}
                                    placeholder="Enter Country"
                                    withIcon={true}
                                    label="Traveling? Set up dates prior to you landing"
                                    subLabel="Country"
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
                                    components={{
                                        Option: ({ children, ...rest }) => (
                                            <components.Option {...rest}>
                                                <> <h6>{children.split(",")[0]}</h6> <span>{rest.data?.province[0]?.text}, {rest.data?.country[0]?.text}</span></>
                                            </components.Option>
                                        )
                                    }}
                                />
                            </div>
                            <div className="bottom-mobile register-bottom">
                                <div className="secret-input type-submit next-prev">
                                    {!confirmPopup && <Link href={router?.query.edit ? "/create-date/date-event?edit=true" : "/create-date/date-event"} >
                                        <button className="next" disabled={invalid}>
                                            {/* <span className="spin-loader-button"></span> */}
                                            Next <FiArrowRight />
                                        </button>
                                    </Link>}
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