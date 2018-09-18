let expect = require('chai').expect;
let validateCommentInput  = require('../validation/comment');

describe('validateCommentInput()', function () {
    it('should produce errors', function () {

        // 1. ARRANGE
        let commentInput = {
            text:"",
        };

        let response = {};
        response.errors = {text : "text field is required"};
        response.isValid = false;

        // 2. ACT
        let response2 = validateCommentInput(commentInput);

        // 3. ASSERT
        expect(JSON.stringify(response2)).to.be.equal(JSON.stringify(response));
    });
});

describe('validateCommentInput()', function () {
    it('should produce no errors', function () {

        // 1. ARRANGE
        let commentInput = {
            text:"HelloWorld",
        };

        let response = {};
        response.errors = {};
        response.isValid = true;

        // 2. ACT
        let response2 = validateCommentInput(commentInput);

        // 3. ASSERT
        expect(JSON.stringify(response2)).to.be.equal(JSON.stringify(response));

    });
});