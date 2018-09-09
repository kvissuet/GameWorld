import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import {getPosts} from '../../redux/actions/postActions'


class Posts extends React.Component {
    componentWillMount(){
        this.props.getPosts()

    }

    render() {

        const { posts, loading } = this.props.post;
        let postContent;

        if (posts === null || loading) {
            postContent = <h1> Loading... </h1>
        } else {
            postContent = <PostFeed posts={posts}/>
        }



        return (
            <div className={'feed'}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-md-12'}>
                            {this.props.auth.user.id && <PostForm/>}
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    post: state.post
});


export default connect(mapStateToProps, {getPosts})(Posts)