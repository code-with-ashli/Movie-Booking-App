const crypto = require('crypto')

/**
 * @function hash
 * @param {string} data 
 * @param {string} salt 
 * @returns {string}
 */
function hash(data, salt, algorithm = 'sha256'){
    return crypto.createHmac(algorithm, salt).update(data).digest('hex')
}


module.exports = {
    hash,
}