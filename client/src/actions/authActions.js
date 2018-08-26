// Register User
import {TEST_DISPATCH} from "./types";

export const registeruser = (userData) => {
    return {
        type: TEST_DISPATCH,
        payload: userData,
    }
}