/**
 *
 * @param {Array} filters it defines which data you only need
 * @param {Array} objectsArray array to navigate a apply the filters
 *
        ["trans_ref", "trans_type", "status"]
        [
            {
                trans_ref: [ 'TR002301000103' ],
                trans_type: [ 'Account' ],
                status: [ 'PENDING_CLEARANCE' ],
                creation_date: [ '2021-01-21T18:39:16+0000' ],
                processed_date: [ '' ],
            },
            {
                trans_ref: [ 'TR002301000103' ],
                trans_type: [ 'Account' ],
                status: [ 'PENDING_CLEARANCE' ],
                creation_date: [ '2021-01-21T18:39:16+0000' ],
                processed_date: [ '' ],
            },
        ]
*/
const dataFilter = (filters, objectsArray) => {
    let objects = objectsArray.map(item => {
        return item
    })
    let dataFiltered = objects.map(item => {
        return filters.map(filter => {
            return { [filter]: item[filter][0] }
        })
    })
    return dataFiltered
}

module.exports = dataFilter