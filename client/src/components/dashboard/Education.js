import React from 'react';
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types';
import Moment from 'react-moment'
import {deleteEducation} from "../../redux/actions/profileActions";

class Education extends React.Component {


    onDeleteClick = (id) => {
        this.props.deleteEducation(id)
    };

    render() {


        const education = this.props.education.map(exp => (
            <tr key={exp._id}>
                <td>{exp.school}</td>
                <td>{exp.degree}</td>
                <td>
                    <Moment format='YYYY/MM/DD'>
                        {exp.from}
                    </Moment>
                    -
                    {exp.to ?
                        <Moment format={'YYYY/MM/DD'}>
                            {exp.to}
                            </Moment> : <p> {' Now'} </p>} </td>
                <td><button onClick={() => this.onDeleteClick(exp._id)} className={"btn btn-danger"}> Delete </button> </td>

            </tr>
        ));
        return (
            <div>
                <h4 className={'mb-4'}> Education  </h4>
                <table className={'table'}>
                    <thread>
                        <tr>
                            <th> School</th>
                            <th> Degree </th>
                            <th> Years </th>
                            <th> </th>
                        </tr>

                        {education}

                    </thread>
                </table>

            </div>
        )
    }
}

Education.propTypes={
    deleteEducation : PropTypes.func.isRequired
};

export default connect(null,{deleteEducation})(Education);