import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import ProfileItem from './ProfileItem';
import Spinner from '../layout/Spinner';

import { getProfiles } from '../../store/actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className='large text-primary'>Developers</h1>
					<p className='lead'>
						<i className='fab fa-connectdevelop' /> Browse and connect with
						developers
					</p>
					<div className='profiles'>
						{profiles.length > 0 ? (
							profiles.map(profile => (
								<ProfileItem key={profile._id} profile={profile} />
							))
						) : (
							<h4> No profiles found...</h4>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = state => {
	return {
		profile: state.profile
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getProfiles: () => dispatch(getProfiles())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profiles);
