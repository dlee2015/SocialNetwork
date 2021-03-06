import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';

import Experiences from './Experience';
import Education from './Education';

import { getCurrentProfile, deleteAccount } from '../../store/actions/profile';

const Dashboard = props => {
	useEffect(() => {
		props.currentProfile();
		console.log(props);
		// eslint-disable-next-line
	}, []);

	const deleteAccount = () => {
		props.deleteAccount();
	};

	return props.account.loading && props.account.profile == null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'> Dashboard </h1>
			<p className='lead'>
				<i className='fas fa-user' /> Welcome{' '}
				{props.auth.user && props.auth.user.name}
			</p>
			{props.account.profile !== null ? (
				<Fragment>
					<DashboardActions />
					{props.account.profile.experience.length == 0 ? null : (
						<Experiences experiences={props.account.profile.experience} />
					)}
					{props.account.profile.education.length == 0 ? null : (
						<Education educations={props.account.profile.education} />
					)}
					<div className='my-2'>
						<button className='btn btn-danger' onClick={() => deleteAccount()}>
							<i className='fas fa-user-minute' /> Delete my account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>You have not yet set up a profile. Please add some info</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		account: state.profile
	};
};

const mapDispatchToProps = dispatch => {
	return {
		currentProfile: () => dispatch(getCurrentProfile()),
		deleteAccount: () => dispatch(deleteAccount())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);
