import React from 'react'
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import { getCurrentProfile, deleteAccount } from "../../redux/actions/profileActions";
import {Link, withRouter} from "react-router-dom";
import ProfileActions from "./ProfileActions";

class Dashboard extends React.Component {
    componentDidMount(){
        this.props.getCurrentProfile();
    }

    onDeleteClick = () => {
        this.props.deleteAccount();
    };

    render() {
        const { user } = this.props.auth;
        const { profile, loading} = this.props.profile;

        let dashboardContent;

        if(profile === null || loading) {
            dashboardContent = <h4> Loading... </h4>
        } else {
            //Check if logged in user has profile data
            if(Object.keys(profile).length > 0) {
                dashboardContent =
                    <div>
                        <p>Welcome <Link to={`/profile/${profile.handle}`}> {user.name} </Link></p>

                        <ProfileActions/>

                        <div style={{ marginBottom: '60px'}} >

                            <button onClick={this.onDeleteClick} className="btn btn-danger">
                                Delete My Account
                            </button>

                        </div>

                    </div>
            } else {
                // User is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className={"lead text-muted"}> Welcome {user.name}</p>
                        <p> You have not yet setup a profile, please add some info</p>
                        <Link to="/create-profile" className={"btn btn-lg btn-info"}>
                            Create Profile
                        </Link>
                    </div>
                )
            }
        }


        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {dashboardContent}
                            <h1 className="display-4">Dashboard</h1>

                            <p className="lead text-muted">Welcome {user.name} </p>

                            <div className="btn-group mb-4" role="group">
                                <Link to="edit-profile.html" className="btn btn-light">
                                    <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</Link>
                                <Link to="add-experience.html" className="btn btn-light">
                                    <i className="fab fa-black-tie text-info mr-1"></i>
                                    Add Experience</Link>
                                <Link to="add-education.html" className="btn btn-light">
                                    <i className="fas fa-graduation-cap text-info mr-1"></i>
                                    Add Education</Link>
                            </div>

                            <div>
                                <h4 className="mb-2">Experience Credentials</h4>
                                {profile && profile.experiences && profile.experiences.map(experience =>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Company</th>
                                            <th>Title</th>
                                            <th>Years</th>
                                            <th/>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>Tech Guy Web Solutions</td>
                                            <td>Senior Developer</td>
                                            <td>
                                                02-03-2009 - 01-02-2014
                                            </td>
                                            <td>
                                                <button className="btn btn-danger">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Traversy Media</td>
                                            <td>Instructor & Developer</td>
                                            <td>
                                                02-03-2015 - Now
                                            </td>
                                            <td>
                                                <button className="btn btn-danger">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                )
                                }
                            </div>


                            <div>
                                <h4 className="mb-2">Education Credentials</h4>
                                {profile && profile.education && profile.education.map(education =>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>School</th>
                                        <th>Degree</th>
                                        <th>Years</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Northern Essex</td>
                                        <td>Associates</td>
                                        <td>
                                            02-03-2007 - 01-02-2009
                                        </td>
                                        <td>
                                            <button className="btn btn-danger">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>)}
                            </div>

                            <div style={{marginBottom: "60px"}}>
                                <button className="btn btn-danger">
                                    Delete My Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(withRouter(Dashboard));