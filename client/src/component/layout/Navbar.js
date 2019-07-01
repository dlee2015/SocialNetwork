import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../store/actions/auth';

const Navbar = props => {
	const authLinks = (
		<ul>
			<li>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li>
				<Link to='/dashboard'>
					<i className='fas fa-user' />
					Dashboard
				</Link>
			</li>
			<li>
				<a onClick={props.logout} href='#!'>
					<i className='fas fa-sign-out-alt' />
					<span className='hide-sm'>Logout</span>
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-code' /> DevConnector
				</Link>
			</h1>
			{!props.loading && (
				<Fragment> {props.isAuthenticated ? authLinks : guestLinks}</Fragment>
			)}
		</nav>
	);
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		loading: state.auth.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logout())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Navbar);
