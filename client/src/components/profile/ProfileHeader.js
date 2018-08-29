import React from 'react'
import isEmpty from "../../validation/is-empty";
import PropTypes from 'prop-types';

class ProfileHeader extends React.Component {
    render() {
        const { profile } = this.props;

        isEmpty(profile.social) ? profile.social = {} : null;

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-info text-white mb-3">
                        <div className="row">
                            <div className="col-4 col-md-3 m-auto">
                                <img className="rounded-circle"
                                     src={profile.user.avatar}
                                     alt=""/>
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="display-4 text-center">{profile.user.name}</h1>
                            <p className="lead text-center">{profile.status}  {!isEmpty(profile.company) && <span> at {profile.company} </span>}</p>
                            <p>{profile.location}</p>
                            <p>

                                {!isEmpty(profile.website) &&
                                    <a className="text-white p-2" href={profile.website}>
                                        <i className="fas fa-globe fa-2x"></i>
                                    </a>
                                }

                                {!isEmpty(profile.social.twitter) &&
                                <a className="text-white p-2" href={profile.social.twitter}>
                                    <i className="fab fa-twitter fa-2x"></i>
                                </a>
                                }

                                {!isEmpty(profile.social.facebook) &&
                                <a className="text-white p-2" href={profile.social.facebook}>
                                    <i className="fab fa-facebook fa-2x"></i>
                                </a>
                                }

                                {!isEmpty(profile.social.instagram) &&
                                <a className="text-white p-2" href={profile.social.instagram}>
                                    <i className="fab fa-instagram fa-2x"></i>
                                </a>
                                }

                                {!isEmpty(profile.social.linkedin) &&
                                <a className="text-white p-2" href={profile.social.linkedin}>
                                    <i className="fab fa-linkedin fa-2x"></i>
                                </a>
                                }

                                {!isEmpty(profile.social.youtube) &&
                                <a className="text-white p-2" href={profile.social.youtube}>
                                    <i className="fab fa-youtube fa-2x"></i>
                                </a>
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ProfileHeader.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileHeader