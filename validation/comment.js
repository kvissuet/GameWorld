const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateCommentInput(data) {
    let errors = {};


    data.text= !isEmpty(data.text) ? data.text: "";




    if(!Validator.isLength(data.text, {min:2, max:1000})){
        errors.text = "Title must be at least 2 characters but less than 1000";
    }


    if(Validator.isEmpty(data.text)){
        errors.text = "text field is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
};