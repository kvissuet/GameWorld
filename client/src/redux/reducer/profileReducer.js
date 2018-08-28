import {CLEAR_CURRENT_PROFILE, GET_PROFILE, PROFILE_LOADING} from "../actions/types";

const initialState = {
    profile: null,
    profiles: null,
    loading: true,
};

export default function(state = initialState, action) {
    switch(action.type){
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };

        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };

        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            };

        default:
            return state;
    }
}