import axios from 'axios';


import {
    GET_PROFILE,
    GET_ERRORS,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    SET_CURRENT_USER,
    GET_PROFILES
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            }))
};

// Get Profile By Handle
export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile/handle/'+handle)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            }))
};

// Create Profile
export const createPorfile = (profileData, history) => dispatch => {
    axios
        .post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
            }
        ))
};

//Add experience
export const addExperience = (expData, history) => dispatch => {
    axios
        .post('/api/profile/experience',expData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }
        ))
};

//Add education
export const addEducation = (expData, history) => dispatch => {
    axios
        .post('/api/profile/education',expData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }
        ))
};

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
};

//Clear Profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
};

//Get all profiles
export const getProfiles = () => dispatch => {
    axios.get('/api/profile/all')
        .then(res =>
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            }))
};

//Delete Experience
export const deleteExperience = (id) => dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')) {
        axios
            .delete('/api/profile/experience/'+id)
            .then(res => dispatch({
                type:GET_PROFILE,
                payload: res.data
            }))
            .catch(err => dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                }
            ))
    }
};

//Delete Education
export const deleteEducation = (id) => dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')) {
        axios
            .delete('/api/profile/education/'+id)
            .then(res => dispatch({
                type:GET_PROFILE,
                payload: res.data
            }))
            .catch(err => dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                }
            ))
    }
};

//Delete Account
export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')) {
        axios
            .delete('/api/profile')
            .then(res => dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            }))
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            )
    }
};