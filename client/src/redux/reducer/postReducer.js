import {GET_ERRORS, ADD_POST, GET_POSTS, DELETE_POST} from "../actions/types";

const initialState = {
    posts: [],
    post: [],
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ERRORS:
            return action.payload;

        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };

        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading:false
            };


        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            };
        default:
            return state;
    }
}