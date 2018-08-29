import React from 'react';
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types';
import Moment from 'react-moment'
import {deleteExperience} from "../../redux/actions/profileActions";

class Experience extends React.Component {


    onDeleteClick = (id) => {
        this.props.deleteExperience(id)
    };

    render() {


        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format='YYYY/MM/DD'>
                            {exp.from}
                            </Moment>
                     -
                    {exp.to ?
                        <Moment format='YYYY/MM/DD'>
                            {exp.to}
                        </Moment>
                        :
                        <p>
                            {' Now'}
                            </p>} </td>
                <td><button onClick={() => this.onDeleteClick(exp._id)} className={"btn btn-danger"}> Delete </button> </td>

            </tr>
        ));
        return (
            <div>
                <h4 className={'mb-4'}> Experience Credentials </h4>
                <table className={'table'}>
                    <thread>
                        <tr>
                            <th> Company</th>
                            <th> Title </th>
                            <th> Years </th>
                            <th> </th>
                        </tr>

                        {experience}

                    </thread>
                </table>

            </div>
        )
    }
}

Experience.propTypes={
    deleteExperience : PropTypes.func.isRequired
};

export default connect(null,{deleteExperience})(Experience);