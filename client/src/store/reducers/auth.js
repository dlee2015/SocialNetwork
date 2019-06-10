import { REGISTER_START, REGISTER_FAIL } from './types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null
}
export default function (state = initialState, action) {
    const {type, payload} = action;

    switch(type){
        case REGISTER_SUCCESS:
            localStorage.getItem('token', payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                isAuthenticated: false,
                token: null,
                loading: false
            }
        case default:
            return state;
    }
}