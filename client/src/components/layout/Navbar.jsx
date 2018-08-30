import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import {logoutUser} from "../../redux/actions/authActions";
import {clearCurrentProfile} from "../../redux/actions/profileActions";
import PropTypes from 'prop-types';

class Navbar extends React.Component {
    onLogoutClick = () =>{
        this.props.logoutUser();
        this.props.clearCurrentProfile();
    };

    render() {
        const { isAuthenticated, user} = this.props.auth;

        const authLinks =(
            <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard"> Dashboard
                    </Link>
                </li>

                <li className="nav-item">

                    <Link className="nav-link" to="/" onClick={this.onLogoutClick}>
                        <img className={"rounded-circle"} style={{width:"25px", marginRight:"5px"}} src={user.avatar} alt={user.name}
                             title={"You must have a Gravatar connected to your email to display an image"}/>
                        Logout
                    </Link>
                </li>

            </ul>
        );

        const guestLinks =(
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">AI-World</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profiles"> Users
                                </Link>
                            </li>
                            <Link className="nav-link" to="/feed"> Forum
                            </Link>
                        </ul>


                        { isAuthenticated ? authLinks : guestLinks }
                        </div>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(withRouter(Navbar));