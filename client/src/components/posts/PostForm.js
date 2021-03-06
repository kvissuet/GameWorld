import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addPost , clearErrors} from "../../redux/actions/postActions";

class PostForm extends React.Component {
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

        const newPost = {
            title:this.state.title,
            text:this.state.text,
            avatar: user.avatar,
            name: user.name
        };

        this.props.addPost(newPost)

        if (this.state.text!=="" && this.state.title!=="") {
            this.setState({text:'',title:''})
        }

    };

    render() {
        const {errors} = this.state;

        return (
            <div >

                <div className="post-form mb-3">
                    <div className="card card-info">
                        <div className="card-header bg-info text-white">
                            Say Somthing...
                        </div>
                        <div className="card-body">
                            <form>
                                <div className={'form-title'}>
                                    <TextFieldGroup value={this.state.title} onChange={this.onChange} error={errors.title} placeholder={"Title"} name={'title'}/>
                                </div>
                                <div className="form-group">

                                    <TextAreaFieldGroup value={this.state.text} onChange={this.onChange} error={errors.text} placeholder={"Say Something"} name={'text'}/>
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

export default connect(mapStateToProps, {addPost, clearErrors})(PostForm)