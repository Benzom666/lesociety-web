import { call, put, all, race, take, takeLatest } from 'redux-saga/effects';
import { apiRequest, showToast, redirect } from '../../utils/Utilities'
import { AUTHENTICATE, DEAUTHENTICATE, AUTHENTICATE_UPDATE } from "./actionConstants";
import { stopSubmit, startSubmit, reset, SubmissionError, updateSyncErrors, registerField, initialize } from 'redux-form';
import Router from 'next/router'
import {SIGNUP1, SIGNUP2, SIGNUP3, LOGIN} from "./actionConstants";

export function* login(action) {
    action.loader(true);
    try {
        const response = yield race({
            success: call(apiRequest, {
                data: action.payload,
                method: 'POST',
                url: `user/login`
            }),
            cancel: take('ROUTE/CHANGE')
        });
        
        if (response.success) {
            yield put({
                type: AUTHENTICATE,
                payload: response.success.data.data
            });
          //  showToast(response.success.data.message, 'success')
           action.loader(false);
            if(response.success.data.data.step_completed === 1 || response.success.data.data.step_completed === 2){
                Router.push({
                    pathname: '/auth/profile',
                })    
            } else {
                if(response.success.data.data.email_verified) {
                    Router.push({
                        pathname: '/user/user-list',
                    })
                } else {
                    Router.push('/auth/profile')
                }
            }
            yield put(reset('LoginForm'));
        }

    } catch (error) {
        action.loader(false);
        if(error.response?.status === 401) {
            yield put(stopSubmit('LoginForm', {[error.response && (error.response?.data?.message === 'Given user name is not registered' || error.response?.data?.message === 'Given user email is not registered') ? 'email' : 'password']: error?.response ? error.response.data.message : error.message}))
        } else {
            showToast("Something went wrong", 'error')
        }
    }
}

function* signup(data) {
    data.loader(true)
    try {
        const response = yield race({
            success: call(apiRequest, {
                data: data.payload,
                method: 'POST',
                url: `user/signup`
            }),
            cancel: take('ROUTE/CHANGE')
        });

        if (response.success) {
            yield put({
                type: AUTHENTICATE,
                payload: response.success.data.data
            });
            data.loader(false)
            Router.push({
                pathname: '/auth/profile',
            })
            if(data.payload?.gender === 'male') {
                yield put(reset('RegisterFormMale'));
            } else {
                yield put(reset('RegisterForm'));
            }
            yield put(reset('signupStep2'))
        }

    } catch (error) {
        data.loader(false)
        yield put(stopSubmit(data.payload?.gender === 'male' ? 'RegisterFormMale' : 'RegisterForm', error?.response ? error.response.data.data : {}))
        // showToast("Something went wrong", 'error')
    }
}

function* signupStep2(data) {
    data.loader(true)
    try {
        const response = yield race({
            success: call(apiRequest, {
                data: data.payload,
                method: 'POST',
                url: `user/signup/step2`
            }),
            cancel: take('ROUTE/CHANGE')
        });

        if (response.success) {
            yield put({
                type: AUTHENTICATE_UPDATE,
                payload: {step_completed: 2}
            });
           // showToast(response.success.data.message, 'success')
            //yield put(reset('signupStep2'))
            data.loader(false)
        }

    } catch (error) {
        data.loader(false)
        yield put(stopSubmit('signupStep2', error?.response ? error.response.data.data : {}))
        showToast(error?.response ? error.response.data.message : error.message, 'error')
    }
}

function* signupStep3(data) {
    data.loader(true)
    try {
        const response = yield race({
            success: call(apiRequest, {
                data: data.payload,
                method: 'POST',
                url: `user/signup/step3`
            }),
            cancel: take('ROUTE/CHANGE')
        });

        if (response.success) {
            yield put({
                type: AUTHENTICATE_UPDATE,
                payload: {step_completed: 3}
            });
            data.loader(false)
           // showToast(response.success.data.message, 'success')
            yield put(reset('signupStep3'))
            yield put(reset('signupStep2'))
        }

    } catch (error) {
        yield put(stopSubmit('signupStep3', error?.response ? error.response.data.data : {}))
        showToast(error?.response ? error.response.data.message : error.message, 'error')
        data.loader(false)
    }
}

export default function* authWatcher() {
  yield takeLatest(SIGNUP1, signup)
  yield takeLatest(SIGNUP2, signupStep2)
  yield takeLatest(SIGNUP3, signupStep3)
  yield takeLatest(LOGIN, login);
}
