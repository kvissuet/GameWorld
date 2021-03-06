import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {deletePost, addLike, removeLike} from "../../redux/actions/postActions";

class PostItem extends React.Component {

    onDeleteClick = () => {
        this.props.deletePost(this.props.post._id)
    };

    onLikeClick = () => {
        if (this.userLiked()) {
            this.props.addLike(this.props.post._id)
        } else {
            this.props.removeLike(this.props.post._id)
        }
    };

    userLiked = () => {
        return this.props.post.likes.filter(like => like.user === this.props.auth.user.id).length === 0
    };

    render() {
        const { post, auth } = this.props;

        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <Link to="/profiles">
                            <img className="rounded-circle d-none d-md-block"
                                 src={post.avatar}
                                 alt=""/>
                        </Link>
                        <br/>
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">


                        <h4> {post.title} </h4>
                        <p className="lead">{post.text}</p>


                        {this.props.showActions &&
                        <div>
                        {this.props.auth.user.id && this.props.post.likes && <button type="button" className="btn btn-light mr-1" onClick={this.onLikeClick}>
                            <i className={classnames(" fas fa-thumbs-up", {
                                'text-info': this.userLiked(),
                                'text-warning': !this.userLiked()})}
                            > {null} </i>
                            <span className="badge badge-light">{post.likes.length}</span>
                        </button>}
                        {/*<button type="button" className="btn btn-light mr-1">*/}
                            {/*<i className="text-secondary fas fa-thumbs-down"></i>*/}
                        {/*</button>*/}
                        <Link to={"/posts/"+post._id} className="btn btn-info mr-1">
                            Comments: {post.comments.length}
                        </Link>
                        {post.user === auth.user.id &&
                        <button type="button" class="btn btn-danger mr-1" onClick={this.onDeleteClick}>
                            <i class="fas fa-times" />
                        </button> }
                        </div>}

                    </div>
                </div>
            </div>
        )
    }
}

PostItem.defaultProps = {
    showActions: true
}


PostItem.propTypes = {
    post:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth:state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem)