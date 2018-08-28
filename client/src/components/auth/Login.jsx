import React from 'react'
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

import {loginUser} from "../../redux/actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup"

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }

        if(nextProps.errors) {
            this.setState({errors:nextProps.errors})
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    };

    onSubmit = (e) => {
        e.preventDefault();

        const login = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.loginUser(login);
    };

    render() {
        const { errors } = this.state;

        return (
            <div>
                <div className="login">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Log In</h1>
                                <p className="lead text-center">Sign in to your GameWorld account</p>
                                <form onSubmit={this.onSubmit}>
                                    <TextFieldGroup
                                        placeholder= "Email Address"
                                        name = "email"
                                        type = "email"
                                        value = {this.state.email}
                                        onChange = {this.onChange}
                                        error = { errors.email}
                                    />

                                    <TextFieldGroup
                                        placeholder= "Password"
                                        name = "password"
                                        type = "password"
                                        value = {this.state.password}
                                        onChange = {this.onChange}
                                        error = { errors.password}
                                    />

                                    <input type="submit" className="btn btn-info btn-block mt-4"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));