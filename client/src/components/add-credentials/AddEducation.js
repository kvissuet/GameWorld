import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import PropTypes from 'prop-types';
import {addEducation} from "../../redux/actions/profileActions";

class AddEducation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            school: "",
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors:nextProps.errors})
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    };

    onCheck = () => {
        this.setState({disabled:!this.state.disabled});
        this.setState({current:!this.state.current});
    };

    onSubmit = (e) => {
        e.preventDefault();

        const expData = {
            school:this.state.school,
            degree:this.state.degree,
            fieldofstudy:this.state.fieldofstudy,
            from: this.state.from,
            to:this.state.to,
            current:this.state.current,
            description:this.state.description
        };

        this.props.addEducation(expData, this.props.history)
    };

    render() {
        const {errors} = this.state;



        return (
            <div className={'add-education'}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-md-8 m-auto'}>
                            <Link to={'/dashboard'} className={'btn btn-light'}>
                                Go Back
                            </Link>
                            <h1 className={'display-4 text-center'}> Add Education </h1>
                            <p className={'lead text-center'}> Add any job or position that you have had in the past or current </p>
                            <small className={'d-block pb-3'}> * = required fields </small>

                            <form onSubmit={this.onSubmit} noValidate>
                                <TextFieldGroup
                                    value={this.state.school}
                                    onChange={this.onChange}
                                    error={errors.school}
                                    placeholder={'* school'}
                                    name={'school'}/>

                                <TextFieldGroup
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                    error={errors.degree}
                                    placeholder={'* degree'}
                                    name={'degree'}/>

                                <TextFieldGroup
                                    value={this.state.fieldofstudy}
                                    onChange={this.onChange}
                                    error={errors.fieldofstudy}
                                    placeholder={'* fieldofstudy'}
                                    name={'fieldofstudy'}/>

                                <h6> From date </h6>
                                <TextFieldGroup
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                    placeholder={''}
                                    name={'from'}
                                    type={'date'}
                                />
                                <h6> To date </h6>
                                <TextFieldGroup
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    placeholder={''}
                                    name={'to'}
                                    type={'date'}
                                    disabled={this.state.disabled ? 'disabled': ""}
                                />

                                <div className={'form-check mb-4'}>
                                    <input
                                        type={'checkbox'}
                                        className={'form-check-input'}
                                        name={'current'}
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id={'current'}
                                    />

                                    <label htmlFor={'current'} className={'form-check-label'}>
                                        Current Job
                                    </label>
                                </div>

                                <TextAreaFieldGroup
                                    onChange={this.onChange}
                                    error={errors.description}
                                    placeholder={"Job Description"}
                                    name={"description"}
                                    value={this.state.description}
                                />

                                <input
                                    type={'submit'}
                                    value={'Submit'}
                                    className={'btn btn-info btn-block mt'}
                                />



                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddEducation.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile:state.profile,
    errors: state.errors
});

export default connect(mapStateToProps,{ addEducation })(withRouter(AddEducation));