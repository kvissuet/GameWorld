import React from 'react'
import Moment from 'react-moment'
import ProfileGithub from "./ProfileGithub";
import PropTypes from 'prop-types';

class ProfileCreds extends React.Component {
    render() {
        const {education, experience } = this.props;

        const expItems = experience.map((exp,index) => (
            <li className="list-group-item" key={index}>
                <h4>{exp.company}</h4>
                <p>
                    <Moment format={'YYYY-MM'}>
                    {exp.from}
                    </Moment>
                        -
                    <Moment format={'YYYY-MM'}>
                        {exp.to}
                    </Moment>
                </p>
                <p>
                    <strong>Position:</strong> {exp.title}
                    </p>

                <p>
                    <strong>Location:</strong> {exp.location}
                    </p>
                <p>
                    <strong>Description:</strong> {exp.description}
                    </p>
            </li>
        ));

        const eduItems = education.map((exp,index) => (
            <li className="list-group-item" key={index}>
                <h4>{exp.school}</h4>
                <p>
                    <Moment format={'YYYY-MM'}>
                        {exp.from}
                    </Moment>
                    -
                    <Moment format={'YYYY-MM'}>
                        {exp.to}
                    </Moment>
                </p>
                <p>
                    <strong>Position:</strong> {exp.degree}
                </p>

                <p>
                    <strong>Location:</strong> {exp.fieldofstudy}
                </p>
                <p>
                    <strong>Description:</strong> {exp.description}
                </p>
            </li>
        ));

        return (
            <div className="row">
                <div className="col-md-6">
                    <h3 className="text-center text-info">Experience</h3>
                    <ul className="list-group">
                        {expItems}
                    </ul>
                </div>
                <div className="col-md-6">
                    <h3 className="text-center text-info">Education</h3>
                    <ul className="list-group">
                        {eduItems}
                    </ul>
                </div>
            </div>
        )
    }
}

ProfileGithub.propTypes = {
    experience: PropTypes.object.isRequired,
    education: PropTypes.object.isRequired
}

export default ProfileCreds