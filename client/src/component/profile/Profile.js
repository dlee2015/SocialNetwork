import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import { getProfileById } from '../../store/actions/profile';

import ProfileTop from './ProfileTop';

const Profile = ({
	match,
	getProfileById,
	profile: { profile, loading },
	auth
}) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById]);

	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/profiles' className='btn btn-light'>
						Back to profiles
					</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.user._id && (
							<Link to='/edit-profile' className='btn btn-dark'>
								{' '}
								Edit Profile
							</Link>
						)}
					<div className='profile-grid my-1'>
						<ProfileTop profile={profile} />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = state => {
	return {
		profile: state.profile,
		auth: state.auth
	};
};

export default connect(
	mapStateToProps,
	{ getProfileById }
)(Profile);
