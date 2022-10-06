import {RESTORE_AUTH_STATE, AUTHENTICATE, DEAUTHENTICATE, SIGNUP1, SIGNUP2, SIGNUP3, SIGNUP4, LOGIN} from "./actionConstants";


export const authenticateAction = (user) => {
   return {
       type: AUTHENTICATE,
       payload: user
   };
};


export const deAuthenticateAction = () => {
   return {
       type: DEAUTHENTICATE,
   };
};


export const restoreState = (authState) => {
   return {
       type: RESTORE_AUTH_STATE,
       payload: authState
   }
};

export const signUp = signUpDetails => {
   return async dispatch => {
       try{
           dispatch(deAuthenticateAction());
           // Signup code. And storing data in result variable
           dispatch(authenticateAction(result));


       }catch (e) {
           dispatch(deAuthenticateAction());
       }
   };
};


export const logout = () => {
   return async dispatch => {
       dispatch(deAuthenticateAction())
    //  clear out all the data from the local storage
    


   }
};


export const restore = (savedState) => {
   return dispatch => {
       dispatch(restoreState(savedState));
   };
};

export function registration(data, loader) {
    return { type: SIGNUP1, payload: data, loader: loader }
}

export function login(data, setLoading) {
    return { type: LOGIN, payload: data, loader: setLoading }
}

export function signupStep2(data, setLoader) {
    return { type: SIGNUP2, payload: data, loader: setLoader }
}

export function signupStep3(data, setLoader) {
    return { type: SIGNUP3, payload: data, loader: setLoader }
}

export function signupStep4(data, setLoader) {
    return { type: SIGNUP4, payload: data, loader: setLoader }
}