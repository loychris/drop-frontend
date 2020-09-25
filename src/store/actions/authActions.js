import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';

export const openAuth = () => {
    return {
        type: actionTypes.OPEN_AUTH
    }
}

export const closeAuth = () => {
    return {
        type: actionTypes.CLOSE_AUTH
    }
}

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (userId, token) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        userId,
        token
    }
}

export const loginFail = (response) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: response.data.message ?? 'Something went wrong'
    }
}

export const login = (identifier, password) => {
    return dispatch => {
        dispatch(loginStart())
        axios.post(
            '/api/users/login', 
            JSON.stringify({
                identification: identifier,
                password: password
            }), 
            { headers: { 'Content-Type': 'application/json' } }
        ).then(res => {
            console.log("*******", res.data);
            dispatch(loginSuccess(res.data.userId, res.data.token));
            dispatch(closeAuth());
        }).catch(err => {
            console.log(err.response);
            dispatch(loginFail(err.response));
        })
    }
}

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    }
}

export const signupSuccess = (userId, token) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        userId,
        token
    }
}

export const signupFail = (response) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: response.data.message ?? 'Something went wrong'
    }
}

export const signup = (name, email, handle, password) => {
    return dispatch => {
        dispatch(signupStart())
        axios.post(
            '/api/users/signup', 
            JSON.stringify({
                email: email,
                password: password,
                handle: handle,
                name: name
            }), 
            { headers: { 'Content-Type': 'application/json' } }
            ).then(res => {
                console.log("*******", res.data);
                dispatch(signupSuccess(res.data.userId, res.data.token));
                dispatch(closeAuth());
            }).catch(err => {
                console.log(err.response);
                dispatch(signupFail(err.response));
            })
    }
}

// signupHandler = (event) => {
//     event.preventDefault();
//     axios.post(
//       '/api/users/signup', 
//       JSON.stringify({
//           email: this.state.email.value,
//           password: this.state.password.value,
//           handle: this.state.handle.value,
//           name: this.state.name.value
//       }), {
//       headers: { 'Content-Type': 'application/json' }
//     }).then(res => {
//       console.log(res.data);
//       this.props.onCloseAuth();
//     }).catch(err => {
//       console.log('ERRRRRRRRROR', err)
//     })
//     console.log(`
//       SIGNING UP 
//       ${this.state.name.value},
//       ${this.state.password.value},
//       ${this.state.email.value},
//       ${this.state.handle.value}
//     `)
//   }

//   loginHandler = (event) => {
//     event.preventDefault();
//     axios.post(
//       '/api/users/login', 
//       JSON.stringify({
//           identification: this.state.email.value,
//           password: this.state.password.value
//       }), {
//       headers: { 'Content-Type': 'application/json' }
//     }).then(res => {
//       console.log(res.data);
//       this.props.onCloseAuth();
//     }).catch(err => {
//       console.log('ERRRRRRRRROR', err)
//     })
//     console.log(`
//       LOGGING IN 
//       ${this.state.email.value},
//       ${this.state.password.value}
//     `)
//   }