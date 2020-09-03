const sass = require('node-sass');
const validateOptions = require('schema-utils');
const { getOptions } = require('loader-utils');
const schema = require('./options.json');

module.exports = function(source) {
    // const callback = this.async();
    const options = getOptions(this);

    validateOptions(schema, options, {
        name: 'Sass Loader',
        baseDataPath: 'options'
    });

    const sassOptions = options.sassOptions || {};

    const result = sass.renderSync({
        data: source,
        ...sassOptions
    });

    return result.css;
};
