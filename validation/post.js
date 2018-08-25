const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
    let errors = {};

    data.title= !isEmpty(data.title) ? data.title: "";
    data.text= !isEmpty(data.text) ? data.text: "";




    if(!Validator.isLength(data.text, {min:2, max:1000})){
        errors.text = "Title must be at least 2 characters but less than 1000";
    }


    if(Validator.isEmpty(data.text)){
        errors.text = "text field is required";
    }

    if(!Validator.isLength(data.title, {min:2, max:160})){
        errors.title = "Title must be atleast 2 characters but less than 160";
    }

    if(Validator.isEmpty(data.title)){
        errors.title = "Title field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};