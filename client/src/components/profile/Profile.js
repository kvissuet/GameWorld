import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProfileByHandle } from "../../redux/actions/profileActions";


import ProfileGithub from "./ProfileGithub";
import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";

class Profile extends React.Component {
    componentDidMount(){
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }

    render() {


        return (
            <div>
                <div>
                    <ProfileGithub/>
                    <ProfileAbout/>
                    <ProfileHeader/>
                    <ProfileAbout/>
                </div>

            </div>
        )
    }
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps,{ getProfileByHandle })(Profile)