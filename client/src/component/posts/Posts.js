import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import { getPosts } from '../../store/actions/post';
import PostItem from './PostItem';

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'> Posts </h1>
			<p className='lead'>
				<i className='fas fa-user' /> Welcome to the Community
			</p>
			{/* Post form */}
			<div className='posts'>
				{posts.map(post => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		</Fragment>
	);
};

const mapStateToProps = state => {
	return {
		post: state.post
	};
};

export default connect(
	mapStateToProps,
	{ getPosts }
)(Posts);