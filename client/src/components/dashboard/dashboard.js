import React from 'react'
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import { getCurrentProfile, deleteAccount } from "../../redux/actions/profileActions";
import {Link, withRouter} from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Education from "./Education";
import Experience from "./Experience";



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

                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />


                        <div style={{ marginBottom: '20px'}} >

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