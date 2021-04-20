const fetch = require('node-fetch');
const parseString = require('xml2js').parseString;

const helper = async (URL, bodyFormData) => {
    let response;
    let XML = await fetch(URL, {
        method: 'POST',
        body: bodyFormData
    })
    XML = await XML.text()
    await parseString(XML, { compact: true, spaces: 2 }, function (err, result) {
        response = result
        return response
    })
    return response
}


module.exports = helper
