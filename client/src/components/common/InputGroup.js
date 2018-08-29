import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types'


const InputGroup = ({
                                name,
                                placeholder,
                                value,
                                error,
                                type,
                                icon,
                                onChange,
                            }) => {
    return(
        <div className="input-group mb-3">
            <div className={"input-group-prepend"}>
                <span className={"input-group-text"}>
                      <i style={{width:"40px"}} className = {icon} />
                </span>
            </div>
            <input
                className={classnames("form-control form-control-lg", {
                    'is-invalid':error
                })}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                value={value}
            />
            { error && (<div className="invalid-feedback">{error} </div>)}
        </div>
    )
};

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

InputGroup.defaultProps = {
    type: 'text'
};

export default InputGroup;