const { stringifyRequest, getOptions } = require('loader-utils');

function loader(source) {}

loader.pitch = function(remainingRequest, precedingRequest, data) {
    const options = getOptions(this);

    return `
        var style = document.createElement('style');
        var content = require(${ stringifyRequest(this, '!!' + remainingRequest) });
        console.log(content);
        style.innerHTML = content.__esModule ? content.default : content;
        document.head.appendChild(style);
    `;
}

module.exports = loader;
