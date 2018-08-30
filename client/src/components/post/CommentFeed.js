import React from 'react'
import CommentItem from "./CommentItem";
import PropTypes from 'prop-types'


export default class CommentFeed extends React.Component {
    render() {
        const{ comments, postId} = this.props
        return (
            <div>
                {comments && <div>{comments.map(comment => <CommentItem key={comment._id} comment={comment} postId={postId}  />)}</div>}
            </div>
        )
    }
}

CommentFeed.propTypes = {
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired
}