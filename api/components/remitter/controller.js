const FormData = require('form-data');
const helper = require('../../helpers/fetchHelper')
const dataFilter = require('../../helpers/dataFilter')

// Move to service
const URL_GET = 'https://test.remit.by/remittventest/remitterws/remitterUser/getProfile'
const URL_UPDATE = 'https://test.remit.by/remittventest/remitterws/remitterUser/updateProfile'
const remitterFilters = [
    'remitter_id',
    'status',
    'firstname',
    'lastname',
    'dob',
    'email',
    'nationality',
    'address1',
    'address2',
    'city',
    'state',
    'postcode',
    'country',
    'source_of_income',
    'type'
]
const documentFilters = [
    'id_type',
    'id_details',
    'id_expiry',
    'id_verified',
    //'id_scan1',
    //'id_scan1_content',
]
module.exports = function () {
    async function get(params) {
        try {
            let bodyFormData = new FormData();
            for (let param in params) {
                bodyFormData.append(param, params[param]);
            }
            let result = await helper(URL_GET, bodyFormData)
            result = result.response.result[0]
            let remitterArray = []
            let remitterDocumentsArray = []

            for (let remitter in result.remitter) {
                remitterArray = dataFilter(remitterFilters, result.remitter)[0]
            }
            for (let documentItem in result.remitter[0].id_documents) {
                remitterDocumentsArray = dataFilter(documentFilters, result.remitter[0].id_documents[documentItem].id_document)[0]
            }
            // Reduce array to transform in object properties
            remitterDocumentsArray = remitterDocumentsArray.reduce((result, item) => {
                var key = Object.keys(item)[0];
                result[key] = item[key];
                return result;
            }, {})
            remitterArray = remitterArray.reduce((result, item) => {
                var key = Object.keys(item)[0];
                result[key] = item[key];
                return result;
            }, {})
            return {
                "document": { ...remitterDocumentsArray },
                "remitter": { ...remitterArray },
            }
        } catch (err) {
            return "Error Catch: " + err.message
        }
    }

    async function update(params) {
        try {
            let bodyFormData = new FormData();
            for (let param in params) {
                bodyFormData.append(param, params[param]);
            }
            let result = await helper(URL_UPDATE, bodyFormData)
            result = result.response.result[0]
            console.log("result - ", result)
            let remitterArray = []
            let remitterDocumentsArray = []

            for (let remitter in result.remitter) {
                remitterArray = dataFilter(remitterFilters, result.remitter)[0]
            }
            for (let documentItem in result.remitter[0].id_documents) {
                remitterDocumentsArray = dataFilter(documentFilters, result.remitter[0].id_documents[documentItem].id_document)[0]
            }
            // Reduce array to transform in object properties
            remitterDocumentsArray = remitterDocumentsArray.reduce((result, item) => {
                var key = Object.keys(item)[0];
                result[key] = item[key];
                return result;
            }, {})
            remitterArray = remitterArray.reduce((result, item) => {
                var key = Object.keys(item)[0];
                result[key] = item[key];
                return result;
            }, {})
            return {
                "document": { ...remitterDocumentsArray },
                "remitter": { ...remitterArray },
            }
        } catch (err) {
            return "Error Catch: " + err.message
        }
    }

    return {
        get,
        update
    }
}