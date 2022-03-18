import _ from 'lodash';
import { stopSubmit, updateSyncErrors } from 'redux-form';
import axios from "axios"; 
import { apiRequest } from '../../../../utils/Utilities'

export const existEmail = _.debounce(async (value, setLoader, setValid, dispatch, gender, error, setMailTest) => {
    if (value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    setLoader(true);
    try {
        const res = await apiRequest({
            data: {
            email: value
            },
            method: 'POST',
            url: `user/validatebyEmail`
        })
        if(res.data.data.isValid) {
            setLoader(false);
            setValid(true);
        }
        else {
            setLoader(false);
            setValid(false);
            // return res.data.message;
            if(gender === 'male') {
              dispatch(stopSubmit('RegisterFormMale', {...error, email: res.data.message}))
            } else {
                dispatch(stopSubmit('RegisterForm', {...error, email: res.data.message}))
            }
        }
        setMailTest(true);
    } catch (err) {
        setLoader(false);
        setMailTest(true);
        // dispatch(stopSubmit('RegisterForm', {email: 'checking'}))
    }
}
}, 1000);
    
export const existUsername = _.debounce(async (values, setLoader, setValid, dispatch, gender, error, setUserTest) => {
    if (values && values.length >= 3 && values.length <= 15) {
    setLoader(true);
    try {
        const res = await apiRequest({
            data: {
            user_name: values
            },
            method: 'POST',
            url: `user/validatebyUsername`
        })
        if(res.data.data.isValid) {
            setLoader(false);
            setValid(true);
        }
        else {
            setLoader(false);
            setValid(false);
            if(gender === 'male') {
                dispatch(stopSubmit('RegisterFormMale', {...error, user_name: res.data.message}))
              } else {
                dispatch(stopSubmit('RegisterForm', {...error, user_name: res.data.message}))
              }
        }
        setUserTest(true)
        } catch (err) {
        setLoader(false);
        setUserTest(true)
        // dispatch(stopSubmit('RegisterForm', {email: 'checking'}))
    }
}
}, 1000);

export const fetchLocation = async () => {
    try {
        const res = await apiRequest({
            method: 'GET',
            url: `country`
        })
        return res.data.data
    }
    catch (e) {
        console.log(e)
    }
}

export const fetchLiveLocation = async (lat, long, countries) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=place%2Cpostcode%2Caddress&limit=1&access_token=${process.env.MAPBOX_TOKEN}`,
            params: { 
                country: countries || undefined
            }
        })
        if(res.data.features.length > 0) {
            const places = res.data.features.map(place => {
                return {
                    name: place.text,
                    country: place.context.filter(item => item.id.includes('country')),
                    label: place.text
                }
            })
            return places
        }
        else {
            return false;
        }
        return res.data.features
    }
    catch (e) {
        console.log(e)
    }
}

export const fetchRealLocation = _.debounce(async (values, countries, setPlaces) => {
    if (values) {
    try {
        const res = await axios({
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${values}.json?types=place,postcode,address&access_token=${process.env.MAPBOX_TOKEN}`,
            params :{
                country: countries || undefined
            }
        })
        if(res.data.features.length > 0) {
            const places = res.data.features.map(place => {
                return {
                    name: place.text,
                    country: place.context.filter(item => item.id.includes('country')),
                    label: place.text
                }
            })
            setPlaces(places)
        }
        else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}
}, 1000);