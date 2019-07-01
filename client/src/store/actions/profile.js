import axios from 'axios';
import { setAlert } from './alert';
import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	ACCOUNT_DELETED,
	CLEAR_PROFILE,
	GET_PROFILES,
	GET_REPOS
} from './types';

export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get('http://localhost:4000/api/profile/me');

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//get all profiles
export const getProfiles = () => async dispatch => {
	dispatch({
		type: CLEAR_PROFILE
	});
	try {
		const res = await axios.get('http://localhost:4000/api/profile');

		dispatch({
			type: GET_PROFILES,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//get profile by user id
export const getProfileById = userId => async dispatch => {
	try {
		const res = await axios.get(
			`http://localhost:4000/api/profile/user/${userId}`
		);

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//get github repos
export const getGithubRepos = username => async dispatch => {
	try {
		const res = await axios.get(
			`http://localhost:4000/api/profile/github/${username}`
		);

		dispatch({
			type: GET_REPOS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//create / update profile

export const createProfile = (
	formData,
	history,
	edit = false
) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.post(
			'http://localhost:4000/api/profile/',
			formData,
			config
		);

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});

		dispatch(setAlert(edit ? 'Profile Updated' : 'Profile created'));

		if (!edit) {
			history.push('/dashboard');
		}
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Add experience
export const addExperience = (formData, history) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.put(
			'http://localhost:4000/api/profile/experience',
			formData,
			config
		);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlert('Experience Added', 'success'));

		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Add education
export const addEducation = (formData, history) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.put(
			'http://localhost:4000/api/profile/education',
			formData,
			config
		);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlert('Education Added', 'Success'));

		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//DELETE experience
export const deleteExperience = key => async dispatch => {
	try {
		const res = await axios.delete(
			`http://localhost:4000/api/profile/experience/${key}`
		);

		dispatch(setAlert('Experience deleted', 'success'));
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.respones.status }
		});
	}
};

//DELETE education
export const deleteEducation = key => async dispatch => {
	try {
		const res = await axios.delete(
			`http://localhost:4000/api/profile/education/${key}`
		);

		dispatch(setAlert('Education deleted', 'success'));
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.respones.status }
		});
	}
};

//Delete account & profile
export const deleteAccount = () => async dispatch => {
	if (window.confirm('Are you sure? This can not be undone')) {
		try {
			await axios.delete('http://localhost:4000/api/profile');
			dispatch({ type: CLEAR_PROFILE });
			dispatch({ type: ACCOUNT_DELETED });

			dispatch(
				setAlert('Your account has been permanently deleted', 'success')
			);
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	}
};
