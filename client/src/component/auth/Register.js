import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../store/actions/alert';
import { register } from '../../store/actions/auth';
import PropTypes from 'prop-types';

const Register = props => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;

	const onChange = e =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});

	const onSubmit = async e => {
		e.preventDefault();
		if (password !== password2) {
			props.setAlert('passwords do not match', 'danger');
		} else {
			props.register({ name, email, password });
		}
	};

	if (props.isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Fragment>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Create Your Account
			</p>
			<form className='form' onSubmit={e => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						onChange={e => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={e => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						value={password2}
						onChange={e => onChange(e)}
						name='password2'
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/login'>Sign In</Link>
			</p>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType)),
		register: ({ name, email, password }) =>
			dispatch(register({ name, email, password }))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);
