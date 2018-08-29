import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../redux/actions/profileActions'
import ProfileItem from "./ProfileItem";

class Profiles extends React.Component {
    componentDidMount() {
        this.props.getProfiles();
    }

    render() {
        const { profiles, loading } = this.props.profile;
        let profileItems;

        if(profiles === null || loading){
            profileItems = <h1> Loading... </h1>
        } else {
            if(profiles.length > 0){
                profileItems = <div> {profiles.map( profile => <ProfileItem profile={profile}/>)} </div>
            } else {
                profileItems = <h4> No profiles found... </h4>
            }
        }

        return (
            <div className={'profiles'}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-md-12'}>
                            <h1 className={'display-4 text-center'}> User Profiles </h1>
                            <p className={'lead text-center'}>
                                Browse and connect with other users.
                            </p>
                            {profileItems}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToPops = state => ({
    profile: state.profile
});

export default connect(mapStateToPops, {getProfiles})(Profiles);