import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPost, addComment, deleteComment } from "../../redux/actions/postActions";
import PostItem from "../posts/PostItem";
import { Link } from 'react-router-dom';
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends React.Component {

    componentDidMount(){
        this.props.getPost(this.props.match.params.id)

    }

    render() {
        const {post, loading} = this.props.post;

        let postContent;

        if (loading || post === null) {
            postContent = <h1> Loading... </h1>
        } else {
            postContent = (
                <div>
                    <PostItem post={post} showActions={false}/>
                    <CommentForm postId={post._id}/>
                    <CommentFeed comments={post.comments} postId={post._id}/>
                </div>

            );
        }

        return (
            <div className={post}>
                <div className={'container'}>
                     <div className={'row'}>
                         <div className={'col-md-12'}>
                             <Link to={'/feed'} className={'btn btn-light mb3'}>
                                 Back To Forum
                             </Link>
                             {postContent}
                         </div>
                     </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, {getPost, addComment, deleteComment })(Post)