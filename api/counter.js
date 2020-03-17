const redis = require('redis')
const config = require('./config')

// TODO: redis client error handling
let redisClient = _redisClient()

async function getCount(siteCode) {
    return new Promise((resolve, reject) => {
        redisClient.get(`site_pv_${siteCode}`, (e, reply) => {
            if (e) {
                reject(e)
            } else {
                resolve(reply)
            }
        })
    })
}

async function getIncreasedCount(siteCode) {
    return new Promise((resolve, reject) => {
        redisClient.incr(`site_pv_${siteCode}`, (e, reply) => {
            if (e) {
                reject(e)
            } else {
                resolve(reply)
            }
        })
    })
}

function _redisClient() {
    return redis.createClient({
        host: config.redis.host,
        port: config.redis.port,
        string_numbers: true
    })
}

module.exports = {
    getCount,
    getIncreasedCount
}
