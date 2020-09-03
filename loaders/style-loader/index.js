const { stringifyRequest, getOptions } = require('loader-utils');
const validateOptions = require('schema-utils');
const schema = require('./options.json');

function loader(source) {}

loader.pitch = function(remainingRequest, precedingRequest, data) {
    const options = getOptions(this);

    // 校验属性的类型
    validateOptions(schema, options, {
        name: 'Style Loader',
        baseDataPath: 'options'
    });

    // 使用JSON字符串化属性
    // 作为变量来拼接字符串
    const attributes = JSON.stringify(options.attributes || {});
    const insert = options.insert === undefined 
                    ? '"head"' 
                    : typeof options.insert === 'string' ? JSON.stringify(options.insert) : options.insert.toString();

    const request = stringifyRequest(this, '!!' + remainingRequest);

    return `
        var style = document.createElement('style');

        var content = require(${ request });
        var attributes = ${ attributes };
        var insert = ${ insert };

        // 遍历设置属性
        for (var key in attributes) {
            style.setAttribute(key, attributes[key]);
        }

        content = content.__esModule ? content.default : content;

        style.innerHTML = content;

        var insertElement;
        if (typeof insert === 'string') {
            var insertElement = document.querySelector(insert);

            insertElement && insertElement.appendChild(style);
        } else {
            insert(style);
        }
    `;
}

module.exports = loader;
