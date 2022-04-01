import React, { useEffect, useState } from "react";
import { Field, reduxForm, change } from 'redux-form'
import { TransitionMotion, spring, presets } from "react-motion";
import { Inputs } from 'core';
import H5 from "./H5";
import Modal from 'react-modal';
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router'
import { IoMdLocate } from 'react-icons/io';
import _ from 'lodash'
import { countriesCode } from '../utils/Utilities';
import { fetchLocation, fetchRealLocation, fetchLiveLocation } from "../modules/auth/forms/steps/validateRealTime"

function LocationPopup({ modalIsOpen, closeModal, selectedLocation, setLocation }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [countries, setCountry] = useState('');
  const [places, setPlaces] = useState('');
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState([
    // key is creation date
    // { key: "t1", data: { name: "Indore", country: 'India', short_code: 'IN' } },
    // { key: "t2", data: { name: "Delhi", country: 'India', short_code: 'IN' } },
    // {
    //   key: "t4",
    //   data: { name: "Jaipur", country: 'India', short_code: 'IN' }
    // },
    // {
    //   key: "t6",
    //   data: { name: "Hyderabad", country: 'India', short_code: 'IN' }
    // },
    // { key: "t7", data: { name: "Bangalore", country: 'India', short_code: 'IN' } },
    // { key: "t8", data: { name: "Pune", country: 'India', short_code: 'IN' } },
    // {
    //   key: "t9",
    //   data: { name: "Noida", country: 'India', short_code: 'IN' }
    // },
    // { key: "t11", data: { name: "Chennai", country: 'India', short_code: 'IN' } }
  ])

  const handleFetchLocation = async (cities) => {
    const alreadyInList = todo.find(item => item.data?.name?.toLowerCase()?.includes(cities?.toLowerCase()));
    if (!alreadyInList) {
      const res = await fetchRealLocation(cities, countries, setCity);
    }
  }

  useEffect(() => {
    if (selectedLocation?.city) {
      setPlaces(selectedLocation?.city);
      dispatch(change('LocationPopup', 'enter_city', selectedLocation?.city))
      handleFetchLocation(selectedLocation?.city)
    }
  }, [selectedLocation])

  const handleChange = async (e) => {
    setPlaces(e.target.value);
    handleFetchLocation(e.target.value)
  }

  useEffect(() => {
    if (city.length > 0) {
      const list = city.map(item => ({ key: 't' + item.name + item.country[0]?.id, data: { name: item.name, country: item?.country[0]?.text, short_code: item?.country[0]?.short_code } }))
      const data = [...todo, ...list];
      const finalTodo = data?.filter((item, index) => data?.findIndex(ele => ele.data.name.toLowerCase() === item?.data?.name?.toLowerCase()) === index)
      setTodo(finalTodo);
    }
  }, [city])

  const handleIcon = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      if (position.coords.latitude !== undefined && position.coords.longitude !== undefined) {
        const locations = await fetchLiveLocation(position.coords.latitude, position.coords.longitude, countries)
        const location = locations[0]
        setPlaces(location?.name);
        const alreadyInList = todo.find(item => item.data.name?.toLowerCase()?.includes(location?.name?.toLowerCase()));
        if (!alreadyInList) {
          setTodo([...todo, { key: 't' + location.name + location.country[0]?.id, data: { name: location.name, country: location?.country[0]?.text, short_code: location?.country[0]?.short_code } }])
        }
        dispatch(change('LocationPopup', 'enter_city', location?.name))
        setLoading(false)
      }
    }, (err) => setLoading(false), { enableHighAccuracy: true });
  }

  useEffect(() => {
    const fetch = async () => {
      const location = await fetchLocation();
      if (location) {
        const locationOption = location?.map(item => countriesCode[item.name]).filter(item => item !== undefined).join();
        setCountry(locationOption);
      }
    };
    fetch();
  }, [])

  const getDefaultStyles = () => {
    return todo.map((todo) => ({
      ...todo,
      style: { height: 0, opacity: 1 }
    }));
  };

  const getStyles = () => {
    return todo
      .filter(({ data }) => {
        return (
          data?.name?.toLowerCase()?.indexOf(places.toLowerCase()) >= 0
        );
      })
      .map((todo, i) => {
        return {
          ...todo,
          style: {
            height: spring(48, presets.gentle),
            opacity: spring(1, presets.gentle)
          }
        };
      });
  };

  const willEnter = () => {
    return {
      height: 0,
      opacity: 1
    };
  }

  const willLeave = () => {
    return {
      height: spring(0),
      opacity: spring(0)
    };
  }


  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      bodyOpenClassName="open-modal-body"
      portalClassName="overlay-modal"
      style={{
        overlay: {
          // background: 'transparent',
          height: 'calc(100vh - 46px)',
          top: '46px',
        }
      }}
      className="city-modal"
    >
      <div className="model_content city-wrapper">
        <div className="icon_wrap location">
          <H5>Select or Search Your City</H5>
          <span style={{ cursor: 'pointer' }} onClick={closeModal}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.99 12.9925L1 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12.9862 1.00525L1.00623 12.9852" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
        <div className='city-popup'>
          <Field
            name="enter_city"
            type="text"
            onChange={handleChange}
            component={Inputs.inputFieldWithIcon}
            bigIcon={true}
            value={places}
            placeholder="Enter City"
            icon={<IoMdLocate />}
            iconClick={handleIcon}
            className="radio-list"
            loading={loading}
          />
        </div>
        <div className="radio-list">
          <TransitionMotion
            defaultStyles={getDefaultStyles()}
            styles={getStyles()}
            willLeave={willLeave}
            willEnter={willEnter}
          >
            {(styles) => (
              <ul>
                {styles.map(({ key, style, data }) => (
                  <li
                    key={key}
                    style={style}
                    onClick={() => {
                      setLocation({ city: data?.name, country: data?.short_code })
                      setTimeout(() => {
                        closeModal();
                       }, 1000);
                      // closeModal();
                    }}
                  >
                    <span>{data?.name}</span>
                    <input type="radio" checked={selectedLocation?.city === data?.name} />
                    <div className="check"></div>
                  </li>
                ))}
              </ul>
            )}
          </TransitionMotion>
        </div>
      </div>
    </Modal>
  )
}

export default reduxForm({
  form: 'LocationPopup', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  // validate
})(LocationPopup)
