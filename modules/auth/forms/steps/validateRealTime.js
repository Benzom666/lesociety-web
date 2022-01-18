import _ from 'lodash';
import { stopSubmit } from 'redux-form';
import { put } from 'redux-saga/effects';
import { apiRequest } from '../../../../utils/Utilities'

export const existEmail = _.debounce(async (value, setLoader, setValid, dispatch) => {
    if (value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    setLoader(true);
    try {
        const res = await apiRequest({
            data: {
            email: value
            },
            method: 'POST',
            url: `/user/validatebyEmail`
        })
        if(res.data.data.isValid) {
            setLoader(false);
            setValid(true);
        }
        else {
            setLoader(false);
            setValid(false);
            dispatch(stopSubmit('RegisterForm', {email: res.data.message}))
        }
    } catch (err) {
        setLoader(false);
        // dispatch(stopSubmit('RegisterForm', {email: 'checking'}))
    }
}
}, 1000);
    
export const existUsername = _.debounce(async (values, setLoader, setValid, dispatch) => {
    if (values && values.length >= 3 && values.length <= 15) {
    setLoader(true);
    try {
        const res = await apiRequest({
            data: {
            user_name: values
            },
            method: 'POST',
            url: `/user/validatebyUsername`
        })
        if(res.data.data.isValid) {
            setLoader(false);
            setValid(true);
        }
        else {
            setLoader(false);
            setValid(false);
            dispatch(stopSubmit('RegisterForm', {user_name: res.data.message}))
        }
    } catch (err) {
        setLoader(false);
        // dispatch(stopSubmit('RegisterForm', {email: 'checking'}))
    }
}
}, 1000);

export const fetchLocation = async () => {
    try {
        const res = await apiRequest({
            method: 'GET',
            url: `/country`
        })
        return res.data.data
    }
    catch (e) {
        console.log(e)
    }
}