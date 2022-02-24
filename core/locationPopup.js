import React, { useEffect, useState, useRef } from "react";
import { Field, reduxForm } from 'redux-form'
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

function LocationPopup() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const [countries, setCountry] = useState('');
    const [places, setPlaces] = useState([]);
    const [todo, setTodo] = useState([
        // key is creation date
        { key: "t1", data: "indore" },
        { key: "t2", data: "delhi" },
        {
          key: "t4",
          data: "jaipur"
        },
        {
          key: "t6",
          data: 'hyderabad'
        },
        { key: "t7", data: 'bangalore' },
        { key: "t8", data: 'kolkata' },
        {
          key: "t9",
          data: 'noida'
        },
        { key: "t11", data: 'chennai'}
      ])

      const city= ['indore', 'delhi', 'jaipur', 'hyderabad', 'bangalore', 'kolkata', 'noida', 'chennai']
    const [enter_city, setEnterCity] = useState('');
   
    const handleChange = async (e) => {
        setPlaces(e.target.value)
        // setTodo([...todo, { key: "t11", data: e.target.value}])
        // setTodo([...todo, {data: e.target.value, key: e.target.value}]);
        // const ele = document.getElementById("list");
        // if(ele) {
        //     ele.style.transform = "translateY(-10px)";
        //     ele.style.transition = "1s";
        // }
    //    fetchRealLocation(e.target.value, countries, setPlaces);
    }

    const handleIcon = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            if(position.coords.latitude !== undefined && position.coords.longitude !== undefined) {
                const location = await fetchLiveLocation(position.coords.latitude, position.coords.longitude, countries)
            }
        }, (err) => console.log('first', err), {enableHighAccuracy: true});
    }

    const openModal = () => {
        setIsOpen(true);
    }
      
    const closeModal = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        const fetch = async () => {
          const location = await fetchLocation();
          if(location) {
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
          .filter(({data}) => {
            return (
                data?.indexOf(places) >= 0 
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
                height: 'calc(100vh - 67px)',
                top: '67px',
            }}}
            className="city-modal"
        >
            <div className="model_content city-wrapper">
                <div className="icon_wrap location">
                <H5>Select or Search Your City</H5>
                <span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.99 12.9925L1 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.9862 1.00525L1.00623 12.9852" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
                    placeholder="Enter City"
                    icon={<IoMdLocate />}
                    iconClick={handleIcon}
                    className="radio-list"
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
                    // className={isDone ? "completed" : ""}
                  >
                    {/* <div className="view">
                      <input
                        className="toggle"
                        type="checkbox"
                        onChange={this.handleDone.bind(null, key)}
                        checked={isDone}
                      /> */}
                       <span>{data}</span>
                      <input type="radio" />
                      <div className="check"></div>
                      {/* <button
                        className="destroy"
                        onClick={this.handleDestroy.bind(null, key)}
                      />
                    </div> */}
                  </li>
                ))}
              </ul>
            )}
          </TransitionMotion>
              {/* <ul>
                {todo.map(({ key, data }) => { 
                 return(
                  <li
                  id="list"
                    key={key}
                  >{data}
                  </li>
                )})}
              </ul> */}
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
