import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { addLike, removeLike, deletePost } from '../../store/actions/post';

const PostItem = ({
	auth,
	post: { _id, text, name, avatar, user, likes, comments, date },
	addLike,
	removeLike,
	deletePost
}) => {
	return (
		<div class='post bg-white p-1 my-1'>
			<div>
				<Link to={`/profile/${user}`}>
					<img class='round-img' src={avatar} alt='' />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p class='my-1'>{text}</p>
				<p class='post-date'>
					Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
				</p>
				<button onClick={e => addLike(_id)} type='button' class='btn btn-light'>
					<i class='fas fa-thumbs-up' />
					{` `}
					{likes.length > 0 && <span>{likes.length}</span>}
				</button>
				<button
					onClick={e => removeLike(_id)}
					type='button'
					class='btn btn-light'
				>
					<i class='fas fa-thumbs-down' />
				</button>
				<Link to={`/posts/${_id}`} class='btn btn-primary'>
					Discussion{' '}
					{comments.length > 0 && (
						<span class='comment-count'>{comments.length}</span>
					)}
				</Link>
				{!auth.loading && user === auth.user._id && (
					<button
						onClick={e => deletePost(_id)}
						type='button'
						class='btn btn-danger'
					>
						<i class='fas fa-times' />
					</button>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addLike: postId => dispatch(addLike(postId)),
		removeLike: postId => dispatch(removeLike(postId)),
		deletePost: postId => dispatch(deletePost(postId))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostItem);
