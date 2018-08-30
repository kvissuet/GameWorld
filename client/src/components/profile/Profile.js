import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProfileByHandle } from "../../redux/actions/profileActions";


import ProfileGithub from "./ProfileGithub";
import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";
import ProfileCreds from "./ProfileCreds";

class Profile extends React.Component {
    componentDidMount(){
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (!nextProps.profile.profile && this.props.profile.loading) {
    //         this.props.history.push('/not-found')
    //     }
    // }

    render() {
        const { profile, loading } = this.props.profile;

        let profileContent;

        if(!profile || loading){
            profileContent = <h1> Loading... </h1>
        } else {
            profileContent = (
                <div>
                    <div className={'row'}>
                        <div className={'col-md-6'}>
                        <Link to={'/profiles'} className={'btn btn-light mb-3 float-left'}>
                            Back To Profiles
                        </Link>
                        </div>

                    <div className={"col-md-6"}/>
                    </div>
                    <ProfileHeader profile={profile}/>
                    <ProfileAbout profile={profile}/>
                    <ProfileCreds education={profile.education} experience={profile.experience}/>
                    {profile.githubusername && <ProfileGithub username={profile.githubusername}/>}




                </div>
            )
        }


        return (
            <div className={"profile"}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-md-12'}>
                            {profileContent}
                        </div>
                    </div>
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