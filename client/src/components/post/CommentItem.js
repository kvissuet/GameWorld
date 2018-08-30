import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {deleteComment} from "../../redux/actions/postActions";
import {Link} from 'react-router-dom'

class CommentItem extends React.Component {

    onDelete = () => {
        this.props.deleteComment(this.props.postId,this.props.comment._id)
    };

    render() {
        const{ text, name , avatar,user} = this.props.comment
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <Link to="/feed">
                            <img className="rounded-circle d-none d-md-block"
                                 src={avatar} alt=""/>
                        </Link>
                        <br/>
                        <p className="text-center">{name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{text} </p>

                        { user === this.props.auth.user.id &&
                        <button type="button" className="btn btn-danger mr-1" onClick={this.onDelete}>
                            <i className="fas fa-times"/>
                        </button>}
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});


export default connect(mapStateToProps,{deleteComment})(CommentItem)

