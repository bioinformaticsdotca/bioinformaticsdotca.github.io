 const fs = require('fs');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
console.log('Starting validation...');
const ajv = new Ajv();
addFormats(ajv);
try {
    const schema = JSON.parse(fs.readFileSync('schema.json', 'utf8'));
    const data = JSON.parse(fs.readFileSync('workshops.json', 'utf8'));
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (valid) {
        console.log('\x1b[32m%s\x1b[0m', 'Validation successful: workshops.json adheres to the schema.');
    } else {
        console.error('\x1b[31m%s\x1b[0m', 'Validation failed. Errors found:');
        console.error(validate.errors);
        process.exit(1);
    }
} catch (error) {
    console.error('An error occurred during the validation process:', error.message);
    process.exit(1);
}