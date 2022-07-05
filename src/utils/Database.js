const { db } = require('./Config')
const { Create } = require('aoi.fb')
const dbb = Create(db)

module.exports = (client) => {
    client.db = dbb
}