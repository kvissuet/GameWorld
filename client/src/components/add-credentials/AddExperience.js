import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import PropTypes from 'prop-types';
import {addExperience} from "../../redux/actions/profileActions";

class AddExperience extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            company: "",
            title: '',
            location: '',
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
            company:this.state.company,
            title:this.state.title,
            location:this.state.location,
            from: this.state.from,
            to:this.state.to,
            current:this.state.current,
            description:this.state.description
        };

        this.props.addExperience(expData, this.props.history)
    };

    render() {
        const {errors} = this.state;



        return (
            <div className={'add-experience'}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-md-8 m-auto'}>
                            <Link to={'/dashboard'} className={'btn btn-light'}>
                                Go Back
                            </Link>
                            <h1 className={'display-4 text-center'}> Add Experience </h1>
                            <p className={'lead text-center'}> Add any job or position that you have had in the past or current </p>
                            <small className={'d-block pb-3'}> * = required fields </small>

                            <form onSubmit={this.onSubmit} noValidate>
                                <TextFieldGroup
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    placeholder={'* Company'}
                                    name={'company'}/>

                                <TextFieldGroup
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                    placeholder={'* title'}
                                    name={'title'}/>

                                <TextFieldGroup
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    placeholder={'location'}
                                    name={'location'}/>

                                <h6> From date *</h6>
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
                                        Current Education
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

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile:state.profile,
    errors: state.errors
});

export default connect(mapStateToProps,{ addExperience })(withRouter(AddExperience));