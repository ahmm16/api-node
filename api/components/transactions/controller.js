const FormData = require('form-data');
const helper = require('../../helpers/fetchHelper')
const dataFilter = require('../../helpers/dataFilter')

const URL = "https://test.remit.by/remittventest/remitterws/transaction/listTransactions"

const filters = [
    "trans_ref",
    "trans_type",
    "status",
    "creation_date",
    "processed_date",
    "originating_country",
    "destination_country",
    "source_currency",
    "source_amount",
    "dest_currency",
    "dest_amount",
    "payment_method",
    "benef_id",
    "benef_name",
]
const responseExample = {
    "transactions": [
        {
            "trans_ref": "",
            "trans_type": "",
            "status": "",
        },
        {
            "trans_ref": "",
            "trans_type": "",
            "status": "",
        }
    ]
}
module.exports = function () {
    async function list(params) {
        try {
            let bodyFormData = new FormData();
            for (let param in params) {
                bodyFormData.append(param, params[param]);
            }
            const result = await helper(URL, bodyFormData)
            let listTransactions = []
            for (let transaction in result.response.result[0].transactions) {
                listTransactions = dataFilter(filters, result.response.result[0].transactions[transaction].transaction)
            }
            console.log("listTransactions", listTransactions)
            return { "transactions": listTransactions }
        } catch (err) {
            return "Error Catch" + err.message
        }
    }

    return {
        list,
    }
}