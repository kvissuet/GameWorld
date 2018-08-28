import React from 'react';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

import TextFieldGroup from '../common/TextFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import {createPorfile, getCurrentProfile} from "../../redux/actions/profileActions";
import isEmpty from "../../validation/is-empty";



class EditProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            displaySocialInput: false,
            handle: "",
            company: "",
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }
    }

    componentDidMount() {
        this.props.getCurrentProfile()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors:nextProps.errors})
        }

        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            //Changes skills to comma seperated string
            const skillsCSV = profile.skills.join(',');

            // If profile field doesn't exist, make empty string
            profile.company = !isEmpty(profile.company) ? profile.company: "";
            profile.website = !isEmpty(profile.website) ? profile.website: "";
            profile.location = !isEmpty(profile.location) ? profile.location: "";
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername: "";
            profile.bio = !isEmpty(profile.bio) ? profile.bio: "";
            profile.social = !isEmpty(profile.social) ? profile.social: {};
            profile.twitter= !isEmpty(profile.social.twitter) ? profile.social.twitter:'';
            profile.facebook= !isEmpty(profile.social.facebook) ? profile.social.facebook:'';
            profile.youtube= !isEmpty(profile.social.youtube) ? profile.social.youtube:'';
            profile.linkedin= !isEmpty(profile.social.linkedin) ? profile.social.linkedin:'';
            profile.instagram= !isEmpty(profile.social.instagram) ? profile.social.instagram:'';

            // Set component fields state
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube
            });

        }

    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    };

    onAddSocialMediaClick = (e) => {
        this.setState({displaySocialInput: !this.state.displaySocialInput})
    };

    onSubmit = (e) => {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
        };

        this.props.createPorfile(profileData, this.props.history)
    };
    render() {
        const {errors, displaySocialInput} = this.state;

        // Status
        const options = [
            { label: '* Select Professional Status', value:0 },
            { label: 'Engineer', value:"Engineer" },
            { label: 'Manager', value:"Manager" },
            { label: 'Student', value:'Student' },
            { label: 'Intern', value:'Intern' },
            { label: 'Freelance', value:'Freelance' },
            { label: 'Other', value:'Other' }
        ];

        let socialInputs;

        if(displaySocialInput) {
            socialInputs = <div>
                <InputGroup
                    onChange={this.onChange}
                    error={errors.twitter}
                    placeholder={"Twitter Profile URL"}
                    name={"twitter"}
                    icon={"fab fa-twitter"}
                    value={this.state.twitter}/>

                <InputGroup
                    onChange={this.onChange}
                    error={errors.facebook}
                    placeholder={"Facebook Profile URL"}
                    name={"facebook"}
                    icon={"fab fa-facebook"}
                    value={this.state.facebook}/>

                <InputGroup
                    onChange={this.onChange}
                    error={errors.instagram}
                    placeholder={"Instagram Profile URL"}
                    name={"instagram"}
                    icon={"fab fa-instagram"}
                    value={this.state.instagram}/>

                <InputGroup
                    onChange={this.onChange}
                    error={errors.linkedin}
                    placeholder={"Linkedin Profile URL"}
                    name={"linkedin"}
                    icon={"fab fa-linkedin"}
                    value={this.state.linkedin}/>

                <InputGroup
                    onChange={this.onChange}
                    error={errors.youtube}
                    placeholder={"Youtube Profile URL"}
                    name={"youtube"}
                    icon={"fab fa-youtube"}
                    value={this.state.youtube}/>
            </div>
        }

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">

                            <h1 className="display-4 text-center">Edit Your Profile</h1>
                            <p className="lead text-center">Let's get some information to make your profile stand
                                out</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmit} >
                                {this.state.handle}
                                <TextFieldGroup
                                    value={this.state.handle}
                                    info={"A unique handle for your profile URL."}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    placeholder={'* Profile Handle'}
                                    name={'handle'}
                                />

                                <SelectListGroup
                                    value={this.state.status}
                                    options={options}
                                    onChange={this.onChange}
                                    error={errors.status}
                                    placeholder={'Status'}
                                    name={'status'}
                                    info={"Share where you are at in your career."}
                                />

                                <TextFieldGroup
                                    value={this.state.company}
                                    info={"Write Self if unemployed."}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    placeholder={'Company'}
                                    name={'company'}
                                />

                                <TextFieldGroup
                                    value={this.state.website}
                                    info={"A url to your website."}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    placeholder={'Website'}
                                    name={'website'}
                                />

                                <TextFieldGroup
                                    value={this.state.location}
                                    info={'City and State (eg. Chicago, IL)'}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    placeholder={'Location'}
                                    name={'location'}
                                />

                                <TextFieldGroup
                                    value={this.state.skills}
                                    info={"Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    placeholder={'Skills'}
                                    name={'skills'}
                                />

                                <TextFieldGroup
                                    value={this.state.githubusername}
                                    info={"Share username to have repos on your profile page."}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    placeholder={'Github Username'}
                                    name={'githubusername'}
                                />

                                <TextAreaFieldGroup
                                    value={this.state.bio}
                                    info={"Share anything else you want to share."}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    placeholder={'Your story so far...'}
                                    name={'bio'}
                                />

                                <div className={"mb-3"}>
                                    <button
                                        type={"button"}
                                        onClick={this.onAddSocialMediaClick}
                                        className={ "btn btn-light"}>
                                        Add Social Network Links
                                    </button>

                                    <span className={ "text-muted"}> Optional </span>

                                </div>

                                {socialInputs}

                                <input type={"submit"} value={"Submit"} className={"btn btn-info btn-block mt-4"}/>






                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createPorfile: PropTypes.func.isRequired,
    getCurrentPorfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile:state.profile,
    errors:state.errors
});

export default connect(mapStateToProps, {createPorfile, getCurrentProfile})(withRouter(EditProfile));