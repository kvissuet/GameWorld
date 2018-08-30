import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment, clearErrors } from "../../redux/actions/postActions";

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            text:"",
            errors:''
        }
    }

    componentWillMount() {
        this.props.clearErrors()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors:nextProps.errors})
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    };

    onClick = (e) => {
        e.preventDefault();

        const { user } =this.props.auth;
        const { postId } = this.props;

        const newComment = {
            text:this.state.text,
            avatar: user.avatar,
            name: user.name
        };


        this.props.addComment(newComment, postId)

        this.setState({text:''})
    };

    render() {
        const {errors} = this.state;

        return (
            <div >

                <div className="post-form mb-3">
                    <div className="card card-info">
                        <div className="card-header bg-info text-white">
                            Make a Comment
                        </div>
                        <div className="card-body">
                            <form>

                                <div className="form-group">

                                    <TextAreaFieldGroup onChange={this.onChange} error={errors.text} placeholder={"Reply to Post"} name={'text'} value={this.state.text}/>
                                </div>
                                <button type="button" className="btn btn-dark" onClick={this.onClick}>Submit</button>
                            </form>
                        </div>
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

export default connect(mapStateToProps, {addComment, clearErrors})(CommentForm)