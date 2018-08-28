import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types'

const TextFieldGroup = ({
        name,
        placeholder,
        value,
        label,
        error,
        info,
        type,
        onChange,
        disabled
    }) => {
    return(
        <div className="form-group">
            <input
                type={type}
                className={classnames("form-control form-control-lg", {
                    'is-invalid':error
                })}
                value={value}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                disabled={disabled}
            />
            {info && <small className={"form-text text-muted"}> {info} </small>}
            { error && (<div className="invalid-feedback">{error} </div>)}
        </div>
    )
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.func,
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;