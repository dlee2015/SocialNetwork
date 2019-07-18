import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERRORS } from './types';

export const getPosts = () => async dispatch => {
	try {
		const res = await axios.get('http://localhost:4000/api/posts');

		dispatch({
			type: GET_POSTS,
			payload: res.data
		});
	} catch (err) {
		console.error(err);
	}
};
