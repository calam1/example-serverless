
// all the ajv stuff is for json validation, this is not idiomatic or good, but just an example
var Ajv = require('ajv');
var ajv = Ajv({
    allErrors: true
});
var schema = {
    "$schema": "http://json-schema.org-draft-04/schema#",
    "required": [ "name", "age" ],
    "properties": {
        "name": {
            "type": "string"
        },
        "age": {
            "type": "number",
            "maximum": 3
        }
    }
};

var validate = ajv.compile(schema);
module.exports.isValidJson = function(data) {
    return validate(data);
};